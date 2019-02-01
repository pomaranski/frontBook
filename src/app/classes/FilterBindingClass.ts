
export class FilterBindingClass {
  public filterName: string;
  public filterIndex: number;
  public filterValue: string;

  constructor(filterName: string, filterValue: string, filterIndex: number) {
    this.filterName = filterName;
    this.filterIndex = filterIndex;
    this.filterValue = filterValue;
  }

}
