import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BuildJob } from '../core/interfaces/build-job.interface';
import { calcComplexity } from '../core/utils/calc-complexity-utils';


@Component({
  selector: 'app-build-jobs',
  templateUrl: './build-jobs.component.html',
  styleUrls: ['./build-jobs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildJobComponent extends DataSource<BuildJob | undefined> implements OnInit, AfterViewInit {

  // Not in use
  //label1: string;
  
  // Represents the data for the HTML
  @Input() data: BuildJob[];
  // An event to throw when removing an item from list
  @Output() remove = new EventEmitter<BuildJob>();
  // An event to add an item in list
  @Output() add = new EventEmitter<string>();
  // Binded department from parent
  @Input() department: string;
  // Instead of the label with ngModel - reference to label element (new row)
  @ViewChild('label') labelElement: ElementRef;

  // Data stream that will hold the data for the virtual scrolling
  dataSource: BehaviorSubject<(BuildJob | undefined)[]>;
  
  // View port for the virtual scrolling element
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  // Catch the resize event on window to update the size of the virtual scroll element
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.virtualScroll.checkViewportSize();
    this.virtualScroll.elementRef.nativeElement.style.height = window.innerHeight - 110 + "px";
  }

  constructor() {
    super();
  }

  // Needed for DataSource
  connect(collectionViewer: CollectionViewer): Observable<(BuildJob[] | undefined[])> {
    return this.dataSource;
  }

  // Needed for DataSource
  disconnect(): void {}

  ngOnInit(): void {
    this.dataSource = new BehaviorSubject<(BuildJob | undefined)[]>(this.data);
  }

  ngAfterViewInit(): void {
    this.onResize({});
  }

  // Add a row to the list - it updates the dataSource to notify the grid that there was changes
  handleEnterKey(event: any) {
    this.add.emit(this.labelElement.nativeElement.value);
    this.labelElement.nativeElement.value = "";

    this.dataSource.next(this.data);
  }

  // Deletes an element from list - it updates the dataSource to notify the grid that there was changes
  deleteRow(item: BuildJob): void {
    this.remove.emit(item);
    this.dataSource.next(this.data);
  }

  // Track by function for ngFor
  trackByJobs(index: number, item: BuildJob): number {
    return item.id;
  }

  /** Not in use, moved to generator service to calculate it only once
   * and not every angular cycle
   */
  getComplexity(num: number): number {
    return calcComplexity(num);
  }
}
