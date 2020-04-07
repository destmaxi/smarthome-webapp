import {Component, Input, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActionType} from "../../../core/models/actions/action.model";

@Component({
  selector: "actionForm",
  templateUrl: "./action.component.html",
  styleUrls: [
    "./action.component.scss"
  ]
})

export class ActionForm implements OnInit {
  actionForm: FormGroup;
  ActionType = ActionType;

  @Input()
  actions: any = [];

  keys(): Array<string> {
    return Object.keys(ActionType)
  }

  ngOnInit(): void {
    this.actionForm = new FormGroup({
      action: new FormControl("", Validators.compose([
        Validators.required
      ])),
      actionName: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })
  }

  addAction(data) {
    console.log(data);
    this.actions.push(data)
  }
}