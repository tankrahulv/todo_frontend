import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks = [];
  currentTask = null;
  currentIndex = -1;
  title = '';
  count = 0;
  skipCount = 0;
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveTasks();
  }

  addTask(): void {
    this.router.navigate(['/add']);
  }

  retrieveTasks(): void {
    this.taskService.getAll(this.skipCount).subscribe(
      (data) => { 
        this.tasks = [...this.tasks, ...data] 
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onScroll() { 
    // console.log('scrolled!!');
    this.count = this.count + 1;
    this.skipCount = (+this.count) * 10;
    this.retrieveTasks();
  }

  refreshList(): void {
    this.retrieveTasks();
    this.currentTask = null;
    this.currentIndex = -1;
  }

  setActiveTask(task, index): void {
    this.currentTask = task;
    this.currentIndex = index;
  }

  removeAllTasks(): void {
    this.taskService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.retrieveTasks();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchTitle(): void {
    this.taskService.findByTitle(this.title).subscribe(
      (data) => {
        this.tasks = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
