import { SubjectService } from "src/app/services/subject.service";

import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { RoadmapService } from "../../../services/roadmapCustom.service";

@Component({
  selector: "app-new-roadmap",
  templateUrl: "./new-roadmap.component.html",
  styleUrls: ["./new-roadmap.component.scss"],
})
export class NewRoadmapComponent implements OnInit {
  public isNewCustomRoadmap: boolean;
  public interestList = [];

  private taskModel = {
    title: "",
    end_date: "",
    link: "",
    description: "",
  };
  public taskList = [];

  public roadmapForm = this.fb.group({
    name: ["", Validators.required],
    level: ["-1", Validators.required],
    objective: ["", Validators.required],
    content_list: ["", Validators.required],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private roadmapService: RoadmapService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.verifyUrlParam();
    this.subjectService.getAllSubjects().then((data) => {
      console.log(data);
      data.map((subject) => {
        this.interestList.push({ token: subject._id, name: subject.label });
      });
    });
    this.taskList = [[{ ...this.taskModel }]];
  }

  type = "roadmap";

  filter(typeFilter: string) {
    this.type = typeFilter;
  }

  // TODO validações
  onSubmit() {
    if (this.roadmapForm.value) this.taskList.splice(0, 1);
    this.roadmapForm.patchValue({
      content_list: this.taskList,
    });
    console.log("formulário ", this.roadmapForm.value);
    this.ngOnInit();
  }
  verifyUrlParam() {
    if (this.activatedRoute.snapshot.url[2])
      this.isNewCustomRoadmap =
        this.activatedRoute.snapshot.url[2].path === "custom";
  }

  addNewTaskObject() {
    this.taskList.unshift({ ...this.taskModel });
  }

  removeTask(index) {
    this.taskList.splice(index, 1);
  }

  handleTaskChange(event, index) {
    this.taskList[index][event.target.name] = event.target.value;
    console.log(this.taskList);
  }

  onSubmitRegister() {
    // TODO validações
    this.roadmapService
      .createCustomRoadmap(this.roadmapForm.value)
      .then((data) => console.log(data));
  }
}
