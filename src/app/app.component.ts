import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { SharedService } from "./services/shared.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  totalParkingSlot: Number;
  carsEnterInReserveParking: Number;
  carsEnterInNonReserveParking: Number;
  carsExitInReserveParking: Number;
  carsExitInNonReserveParking: Number;
  result: any;
  inquiryForm = this.formBuilder.group({
    reserve_parking: new FormControl("", [Validators.required]),
    non_reserve_parking: new FormControl("", [Validators.required]),
    left_reserve_parking: new FormControl("", [Validators.required]),
    left_non_reserve_parking: new FormControl("", [Validators.required]),
    result: new FormControl("", [])
  });
  constructor(
    private formBuilder: FormBuilder,
    private shared: SharedService
  ) {}

  ngOnInit() {
    var dataSet = {
      uniqueId: "nas_parkinglot"
    };
    this.shared.getParkingCapacity(dataSet).subscribe(data => {
      const res = JSON.parse(JSON.stringify(data));
      if (res.status === 200) {
        this.result = res;
      }
    });
  }

  onSubmit() {
    if (this.inquiryForm.valid) {
      const _v = this.inquiryForm.value;
      const form = new FormData();
      form.append("reserve_parking", _v.reserve_parking);
      form.append("non_reserve_parking", _v.non_reserve_parking);
      form.append("left_reserve_parking", _v.left_reserve_parking);
      form.append("left_non_reserve_parking", _v.left_non_reserve_parking);

      // Submit your form to app call
    }
  }
}
