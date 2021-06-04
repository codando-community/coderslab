import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userMock } from 'src/app/app.component';

import { ScheduleService } from "src/app/services/schedule.service";
import { GroupService } from "src/app/services/group.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.scss'],
})
export class DetailGroupComponent implements OnInit {
  // public user = userMock;
  public group: any = userMock.group_list;
  public modalData: any;
  public selecteduser: any;

  public showModal: any = {
    viewSchedule: false,
    newSchedule: false,
    leaveGroup: false,
    deleteUser: false,
  }

  public isGroupOwner: boolean;

  public scheduleForm = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    link: ['', Validators.required],
    description: [''],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private scheduleService: ScheduleService,
    private groupService: GroupService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    const urlToken = this.activatedRoute.snapshot.paramMap.get("token");
    // TODO fazer load para dar tempo do category carregar e não dar erro no console

    this.groupService.getGroupByToken(urlToken)
    .then(data => {
      this.group = data;
      this.group.id = this.group._id;
      this.group.owner = this.group._owner;

      delete this.group._id;
      delete this.group._owner;

      // // this.isGroupOwner = this.group.owner === this.user.id;
      this.isGroupOwner = this.group.owner === "60ac594c68ec2ca3d561db6f";

      // buscando reuniões do grupo
      this.scheduleService.getAllSchedulesByGroup(this.group.id)
      .then(data => {
        this.group.schedule_list = this.scheduleService.listSchedule(data);
      })
      .catch(err => {
        this.group.schedule_list = [];
        // console.log("Erro: ", err);
      });

      // buscando integrantes do grupo
      this.groupService.getAllUserByGroup(this.group.id)
      .then(data => {
        this.group.user_list = this.userService.listUsers(data);
      })
      .catch(err => {
        this.group.user_list = [];
        // console.log("Erro: ", err);
      });
    })
    .catch(err => {

    });
  }

  openScheduleLink = () => window.open(this.modalData.link, '_blank');

  handleRedirectToEdit = () =>
    this.router.navigate([`/groups/edit`, this.group.token]);

  onSubmitNewSchedule() {
    let newDate = new Date(`${this.scheduleForm.value.date}T${this.scheduleForm.value.time}:00`);

    const body = {
      "datetime": newDate,
      "link": this.scheduleForm.value.link,
      "description": this.scheduleForm.value.description,
      "owner": this.group.owner,
      "id_group": this.group.id
    }

    this.scheduleService.createSchedule(body)
    .then(data => {
      this.scheduleService.getAllSchedulesByGroup(this.group.id)
      .then(res => {
        this.group.schedule_list = this.scheduleService.listSchedule(res);
      })
      .catch(error => {
        this.group.schedule_list = [];
        // console.log("Erro: ", err);
      });

      this.showModal.newSchedule = false;
      this.scheduleForm.patchValue({ date: '', time: '', link: '', description: ''});
      // console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  }


  /**
   * Remove user from current group
   */
  leaveGroup(): void {
    // TODO leave group integration
  }

  /**
   * Owner can remove an user from current group
   */
  removeUser(user: any) {

  }
}
