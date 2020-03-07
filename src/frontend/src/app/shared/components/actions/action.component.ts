import {Component, Input} from "@angular/core";
import {Action} from "../../../core/models/actions/action.model";

@Component({
  selector: "action",
  templateUrl: './action.component.html',
  styleUrls: [
    './action.component.scss'
  ]
})

export class ActionComponent {
  @Input()
  action: Action;
}
