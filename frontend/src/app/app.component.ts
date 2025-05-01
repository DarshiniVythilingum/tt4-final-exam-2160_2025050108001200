import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Bug } from './bug.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AppComponent implements OnInit {
  title = 'Bug Tracker System';
  bugs: Bug[] = [];
  newBug: Bug = {
    id: 0,
    title: '',
    description: '',
    priority: 'Low',
    isResolved: false
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBugs();
  }

  loadBugs(): void {
    this.apiService.getBugs().subscribe((data) => (this.bugs = data));
  }

  addBug(): void {
    this.apiService.addBug(this.newBug).subscribe(() => {
      this.newBug = { id: 0, title: '', description: '', priority: 'Low', isResolved: false };
      this.loadBugs();
    });
  }

  deleteBug(id: number): void {
    this.apiService.deleteBug(id).subscribe(() => this.loadBugs());
  }

  toggleResolved(bug: Bug): void {
    bug.isResolved = !bug.isResolved;
    this.apiService.updateBug(bug).subscribe(() => this.loadBugs());
  }
}
