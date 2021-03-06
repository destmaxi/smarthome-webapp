import {Injectable} from "@angular/core";
import axios from 'axios';
import {Permission} from "../models/permission.model";
import {AuthenticationService} from "./authentication.service";
import {User} from "../models/user.model";
import {Action} from "../models/actions/ConcreteAction.model";
import {DefaultDevice} from "../models/devices/DefaultDevice.model";
import {Device} from "../models/devices/device.model";
import {FlashMessagesService} from "angular2-flash-messages";


@Injectable()
export class DeviceService {

  constructor(
      private authenticationService: AuthenticationService,
      private alert: FlashMessagesService
  ) {
  }

  switchFav(device: Device) {
    const user: User = this.authenticationService.getCurrentUser();
    if (device.favorite) {
      axios.delete(`api/device/fav`, {
        data: {
          token: user.token,
          userID: user.username,
          id: device.id
        }
      }).then(_ => {
        device.favorite = false
      })
    } else {
      axios.post(`api/device/fav`, {
        token: user.token,
        userID: user.username,
        id: device.id
      }).then(_ => {
        device.favorite = true
      })
    }

  }

  fetchDevicesForRoom(devices: DefaultDevice[], roomID: string) {
    const user: User = this.authenticationService.getCurrentUser();
    axios.get(`api/device/devices/${roomID}`, {params: {token: user.token}}).then(res => {
      res.data.devices.forEach(device => {
        axios.get(`api/device/device/${device}`, {params: {token: user.token}}).then(res => {
          console.log(res.data);
          const device1: DefaultDevice = new DefaultDevice(this, {
            name: res.data.device.device.name,
            status: res.data.device.device.status,
            actions: [],
            favorite: false,
            permission: (<any>Permission)[res.data.device.device.permission.toUpperCase()],
            id: res.data.device._id,
            roomID: roomID
          });
          console.log(res.data.device.device);
          res.data.device.device.actions.forEach(action => {
            const concreteAction: Action = new Action(
                this.authenticationService,
                this,
                device1,
                action
            );
            if (concreteAction) device1.addAction(concreteAction)
          });
          devices.push(device1);
          axios.get(`api/device/fav/device/${res.data.device._id}/user/${user.username}`, {params: {token: user.token}}).then(res => {
            device1.setFav(res.data.isfav)
          })
        })
      });

    })
  }

  fetchAllDevices(devices: DefaultDevice[]) {
    const user: User = this.authenticationService.getCurrentUser();

    axios.get(`api/device/devices`, {params: {token: user.token}})
        .then(res => {
          res.data.devices.forEach(device => {
            console.log(device);
            axios.get(`api/device/device/${device.device.id}`, {params: {token: user.token}}).then(res => {
              const device1: DefaultDevice = new DefaultDevice(this, {
                name: res.data.device.device.name,
                status: res.data.device.device.status,
                actions: res.data.device.device.actions,
                favorite: false,
                permission: (<any>Permission)[res.data.device.device.permission.toUpperCase()],
                id: res.data.device._id,
                roomID: ""
              });
              devices.push(device1)
            })
          })
        });
  }

  fetchDevices(devices: DefaultDevice[]) {
    const user: User = this.authenticationService.getCurrentUser();

    if (user.permission == Permission.ADMIN) {
      this.fetchAllDevices(devices);
      return
    }

    axios.get(`api/room/rooms/${user.username}`, {params: {token: user.token}})
        .then(res => {
          console.log(res.data.rooms);
          res.data.rooms.forEach(room => {
            this.fetchDevicesForRoom(devices, room);
          })
        });
  }

  displayAlert(msg: string, type: string) {
    this.alert.show(msg, {
      cssClass: `alert-${type}`,
      dismiss: true,
      timeout: 2000,
      showCloseBtn: true,
      closeOnClick: true
    });
  }

  filter(s) {
    return s.replace(/ |'|\"/g, '');
  }

  createDevice(device: any) {
    axios.post(`api/device/device`, {
      token: this.authenticationService.getCurrentUser().token,
      device: {
        permission: device.permission,
        actions: device.actions,
        name: device.id,
        id: this.filter(device.id)
      }
    }).then(_ => {
      this.displayAlert("Device successfully created!", "success")
    }).catch(_ => {
      this.displayAlert("Failed to create device!", "danger")
    })
  }

  addDeviceToRoom(roomID: string, id: string) {
    axios.post(`api/device/room`, {
      roomID: this.filter(roomID),
      id: this.filter(id),
      token: this.authenticationService.getCurrentUser().token
    })
  }

  getDevice(id: string) {
    const user: User = this.authenticationService.getCurrentUser();
    return axios.get(`api/device/device/${this.filter(id)}`, {params: {token: user.token}})
  }

  updateDevice(device: Device) {
    device.id = this.filter(device.name);
    console.log(device);
    axios.post(`api/device/update`, {token: this.authenticationService.getCurrentUser().token, device: device})
        .then(_ => {
          this.displayAlert("Device successfully updated!", "success")
        })
  }
}
