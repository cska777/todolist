import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

const TODO_KEY = 'myTodoList';
const IMPORTANT_KEY = 'important';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  public todo: any[] = [];
  public inputData: string = '';
  public important : any[] = [];


  constructor() {
    // Récupérer les tâches depuis le localStorage lors de l'initialisation
    const storedTodo = localStorage.getItem(TODO_KEY);
    this.todo = storedTodo ? JSON.parse(storedTodo) : [];

    const storedImportantTasks = localStorage.getItem(IMPORTANT_KEY);
    this.important = storedImportantTasks ? JSON.parse(storedImportantTasks) : [];
  }

  ngOnInit(): void {
  }

  add() {
    if (this.inputData.trim() !== '') {
      const newTache = { description: this.inputData, completed: false };
      this.todo.push(newTache);
      this.inputData = '';
      localStorage.setItem(TODO_KEY, JSON.stringify(this.todo));
    }
  }


  delete(index: number) {
    this.todo.splice(index, 1);
    localStorage.setItem(TODO_KEY, JSON.stringify(this.todo));
  }

  toggleComplete(index : number){
    this.todo[index].completed = !this.todo[index].completed;
  }

  deleteAll() {
    this.todo = [];
    this.important = [];
    localStorage.setItem(TODO_KEY, JSON.stringify(this.todo));
    localStorage.setItem(IMPORTANT_KEY, JSON.stringify(this.important));
  }

  toggleImportant(index: number) {
    this.todo[index].important = !this.todo[index].important;

    if (this.todo[index].important) {
      this.important.push(this.todo[index]);
    } else {

      const importantIndex = this.important.indexOf(this.todo[index]);
      if (importantIndex !== -1) {
        this.important.splice(importantIndex, 1);
      }
    }
    
    localStorage.setItem(TODO_KEY, JSON.stringify(this.todo));
    localStorage.setItem(IMPORTANT_KEY, JSON.stringify(this.important));

  }

  deleteImportant(index: number) {
    this.important.splice(index, 1);
    localStorage.setItem(IMPORTANT_KEY, JSON.stringify(this.important));
  }
}