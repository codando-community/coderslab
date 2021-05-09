import { Component, Input, Output, EventEmitter, OnInit} from "@angular/core";

@Component({
  selector: "app-input-auto-complete",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class BasicAutoCompleterComponent implements OnInit {
  ngOnInit(): void {
    this.interestListBD = this.interestLisInput
  }
  @Input() theme: string;
  @Input() placeholder: string;
  @Input() interestLisInput: any[];
  @Output() itemEvent = new EventEmitter<any[]>();


  keyword = "name";
  private interestList = [];
  private interestListFilter = [];
  private interestListBD;
  selectEvent(item) {
    this.interestList.push(item);
    const interestIndex = this.interestListBD.findIndex(
      (interest) => interest.name == item.name
    );
    this.interestListBD.splice(interestIndex, 1);
    this.getInterestList()
  }

  removeInterest(interest) {
    var interestRemove = interest.path[0].className;
    const interestIndex = this.interestList.findIndex(
      (interest) => interest.name == interestRemove
    );
    this.interestListBD.push(this.interestList[interestIndex]);
    this.interestListBD = [...this.interestListBD.splice(interestIndex)];
    this.interestList.splice(interestIndex, 1);
    this.getInterestList()
  }

  addInterest(interest) {
    if (this.interestListFilter.length > 0) {
      var interestAdd = interest.path[0].className;
      const interestIndex = this.interestListBD.findIndex(
        (i) => i.name == interestAdd
      );
      this.interestList.push(this.interestListBD[interestIndex]);
      this.interestListBD.splice(interestIndex, 1);

      this.interestListFilter.splice(
        this.interestListFilter.findIndex((i) => i.name == interestAdd),
        1
      );
    }
    this.getInterestList()
  }

  filterList(event) {
    if (event.target.value.length > 0) {
      this.interestListFilter = this.interestListBD.filter((interest) =>
        interest.name.toLowerCase().includes(event.target.value)
      );
    } else {
      this.interestListFilter.splice(0);
    }
  }
  public getInterestList() {
    this.itemEvent.emit([this.interestList]);
  }
}
