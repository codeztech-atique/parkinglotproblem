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
  totalParkingSpace: Number;
  carsEnterInReserveParking: Number;
  carsEnterInNonReserveParking: Number;
  carsExitInReserveParking: Number;
  carsExitInNonReserveParking: Number;
  output: any;
  inquiryForm = this.formBuilder.group({
    total_parking: new FormControl("", [Validators.required]),
    reserve_parking: new FormControl("", [Validators.required]),
    non_reserve_parking: new FormControl("", [Validators.required]),
    left_reserve_parking: new FormControl("", [Validators.required]),
    left_non_reserve_parking: new FormControl("", [Validators.required]),
    result: new FormControl("")
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
        var filterData = {};
        var parseJson = res.data;
        filterData["totalParkingSlot"] = parseJson.totalParkingSlot;
        filterData["reservedParkingCapacity"] =
          parseJson.reservedParkingCapacity;
        filterData["notReservedParkingCapacity"] =
          parseJson.notReservedParkingCapacity;
        filterData["noOfCars_reservedParking"] =
          parseJson.noOfCars_reservedParking;
        filterData["noOfCars_NotreservedParking"] =
          parseJson.noOfCars_NotreservedParking;
        this.output = JSON.stringify(filterData);
        this.totalParkingSpace = parseJson.totalParkingSlot;
      } else {
        this.output = JSON.stringify(res);
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
      var dataSet = {
        uniqueId: "nas_parkinglot",
        noOfCars_EnterIn_ReservedParking: this.carsEnterInReserveParking,
        noOfCars_EnterIn_NonReservedParking: this.carsEnterInNonReserveParking,
        noOfCars_removedFrom_ReservedParking: this.carsExitInReserveParking,
        noOfCars_removedFrom_NonReservedParking: this
          .carsExitInNonReserveParking
      };
      console.log(dataSet);
      this.shared.updateParkingCapacity(dataSet).subscribe(
        data => {
          const res = JSON.parse(JSON.stringify(data));
          if (res.status === 200) {
            var filterData = {};
            var parseJson = res.data;
            filterData["totalParkingSlot"] = parseJson.totalParkingSlot;
            filterData["reservedParkingCapacity"] =
              parseJson.reservedParkingCapacity;
            filterData["notReservedParkingCapacity"] =
              parseJson.notReservedParkingCapacity;
            filterData["noOfCars_reservedParking"] =
              parseJson.noOfCars_reservedParking;
            filterData["noOfCars_NotreservedParking"] =
              parseJson.noOfCars_NotreservedParking;
            this.output = JSON.stringify(filterData);
          }
        },
        error => {
          this.output = JSON.stringify(error.error);
        }
      );

      // Submit your form to app call
    }
  }
}
