import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [CommonModule,FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
 paginatedData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 16;
  totalPages: number = 1;

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  toggleAction: boolean = false;
  selectedRows: Set<number> = new Set();
  newRowData: any = {};
  isAddingNewRow: boolean = false;

  searchText: string = '';
  filterDateFrom: string = '';
  filterDateTo: string = '';
  filteredData: any[] = [];

  ngOnInit() {
    this.filteredData = [...this.tableData];
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.updatePaginatedData();
  }

  objectEntries(obj: any): [string, any][] {
    return Object.entries(obj);
  }

  updatePaginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(start, end);
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  applyFilters() {
    this.filteredData = this.tableData.filter(row => {
      const matchesSearch = Object.values(row).some(value =>
        value?.toString().toLowerCase().includes(this.searchText.toLowerCase())
      );
      const rowDate = new Date(row['releaseDate']);

      const fromDate = this.filterDateFrom ? new Date(this.filterDateFrom) : null;
      const toDate = this.filterDateTo ? new Date(this.filterDateTo) : null;

      const matchesFrom = fromDate ? rowDate >= fromDate : true;
      const matchesTo = toDate ? rowDate <= toDate : true;

      return matchesSearch && matchesFrom && matchesTo;
    });

    this.currentPage = 1;
    this.updatePaginatedData();
  }



  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

sortData(column: string) {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  this.filteredData.sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];

    if (valueA == null) return 1;
    if (valueB == null) return -1;

    let result: number;

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      result = valueA.localeCompare(valueB);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      result = valueA - valueB;
    } else {
      result = String(valueA).localeCompare(String(valueB));
    }

    return this.sortDirection === 'asc' ? result : -result;
  });

  this.currentPage = 1;
  this.updatePaginatedData();
}


  actionBtnActive() {
    this.toggleAction = !this.toggleAction;
  }

  toggleRowSelection(rowIndex: number) {
    if (this.selectedRows.has(rowIndex)) {
      this.selectedRows.delete(rowIndex);
    } else {
      this.selectedRows.add(rowIndex);
    }
  }

  hideSelected() {
    this.tableData = this.tableData.filter((_, index) => !this.selectedRows.has(index));
    this.updatePaginatedData();
  }

  deleteSelected() {
    this.tableData = this.tableData.filter((_, index) => !this.selectedRows.has(index));
    this.selectedRows.clear();
    this.updatePaginatedData();
  }

  addRow() {
    this.isAddingNewRow = true;
  }

  cancelAddRow() {
    this.isAddingNewRow = false;
    this.newRowData = {};
  }

  confirmAddRow() {
    if (window.confirm('Do you want to add this new row?')) {
      this.tableData.push(this.newRowData);
      this.updatePaginatedData();
      this.cancelAddRow();
    }
  }

  onInputChange(event: Event, key: string) {
    const target = event.target as HTMLInputElement;
    this.newRowData[key] = target.value;
  }

  tableData: { [key: string]: string }[] = [
    {
      name: 'Map F',
      cellName: 'Zeta',
      chartTitle: 'River Systems',
      chartTitleArabic: 'أنظمة الأنهار',
      projection: 'Transverse Mercator',
      chartScale: '1:75,000',
      region: 'Northwest',
      releaseDate: '2024-05-18'
    },
    {
      name: 'Map G',
      cellName: 'Eta',
      chartTitle: 'Agricultural Zones',
      chartTitleArabic: 'المناطق الزراعية',
      projection: 'WGS 84',
      chartScale: '1:150,000',
      region: 'Southwest',
      releaseDate: '2023-12-12'
    },
    {
      name: 'Map H',
      cellName: 'Theta',
      chartTitle: 'Flood Risk Areas',
      chartTitleArabic: 'مناطق خطر الفيضانات',
      projection: 'Albers Equal Area',
      chartScale: '1:80,000',
      region: 'Delta',
      releaseDate: '2024-08-01'
    },
    {
      name: 'Map I',
      cellName: 'Iota',
      chartTitle: 'Forest Coverage',
      chartTitleArabic: 'تغطية الغابات',
      projection: 'Lambert Azimuthal Equal-Area',
      chartScale: '1:60,000',
      region: 'West Central',
      releaseDate: '2023-07-19'
    },
    {
      name: 'Map J',
      cellName: 'Kappa',
      chartTitle: 'Seismic Zones',
      chartTitleArabic: 'المناطق الزلزالية',
      projection: 'Plate Carrée',
      chartScale: '1:300,000',
      region: 'Northeast',
      releaseDate: '2024-02-05'
    },
    {
      name: 'Map K',
      cellName: 'Lambda',
      chartTitle: 'Infrastructure Projects',
      chartTitleArabic: 'مشاريع البنية التحتية',
      projection: 'WGS 84',
      chartScale: '1:40,000',
      region: 'Southeast',
      releaseDate: '2024-04-11'
    },
    {
      Name: 'Map L',
      cellName: 'Mu',
      chartTitle: 'Wetland Areas',
      chartTitleArabic: 'المناطق الرطبة',
      projection: 'Mollweide',
      chartScale: '1:120,000',
      region: 'Central-East',
      releaseDate: '2023-09-25'
    },
    {
      Name: 'Map M',
      cellName: 'Nu',
      chartTitle: 'Wind Patterns',
      chartTitleArabic: 'أنماط الرياح',
      projection: 'Robinson',
      chartScale: '1:250,000',
      region: 'Coastal North',
      releaseDate: '2024-10-16'
    },
    {
      Name: 'Map N',
      cellName: 'Xi',
      chartTitle: 'Transportation Routes',
      chartTitleArabic: 'طرق النقل',
      projection: 'Mercator',
      chartScale: '1:70,000',
      region: 'Eastern Corridor',
      releaseDate: '2024-11-03'
    },
    {
      Name: 'Map O',
      cellName: 'Omicron',
      chartTitle: 'Population Distribution',
      chartTitleArabic: 'توزيع السكان',
      projection: 'Equal Earth',
      chartScale: '1:90,000',
      region: 'North-Central',
      releaseDate: '2024-12-21'
    },
    {
      name: 'Map F',
      cellName: 'Zeta',
      chartTitle: 'River Systems',
      chartTitleArabic: 'أنظمة الأنهار',
      projection: 'Transverse Mercator',
      chartScale: '1:75,000',
      region: 'Northwest',
      releaseDate: '2024-05-18'
    },
    {
      name: 'Map G',
      cellName: 'Eta',
      chartTitle: 'Agricultural Zones',
      chartTitleArabic: 'المناطق الزراعية',
      projection: 'WGS 84',
      chartScale: '1:150,000',
      region: 'Southwest',
      releaseDate: '2023-12-12'
    },
    {
      name: 'Map H',
      cellName: 'Theta',
      chartTitle: 'Flood Risk Areas',
      chartTitleArabic: 'مناطق خطر الفيضانات',
      projection: 'Albers Equal Area',
      chartScale: '1:80,000',
      region: 'Delta',
      releaseDate: '2024-08-01'
    },
    {
      name: 'Map I',
      cellName: 'Iota',
      chartTitle: 'Forest Coverage',
      chartTitleArabic: 'تغطية الغابات',
      projection: 'Lambert Azimuthal Equal-Area',
      chartScale: '1:60,000',
      region: 'West Central',
      releaseDate: '2023-07-19'
    },
    {
      name: 'Map J',
      cellName: 'Kappa',
      chartTitle: 'Seismic Zones',
      chartTitleArabic: 'المناطق الزلزالية',
      projection: 'Plate Carrée',
      chartScale: '1:300,000',
      region: 'Northeast',
      releaseDate: '2024-02-05'
    },
    {
      name: 'Map K',
      cellName: 'Lambda',
      chartTitle: 'Infrastructure Projects',
      chartTitleArabic: 'مشاريع البنية التحتية',
      projection: 'WGS 84',
      chartScale: '1:40,000',
      region: 'Southeast',
      releaseDate: '2024-04-11'
    },
    {
      Name: 'Map L',
      cellName: 'Mu',
      chartTitle: 'Wetland Areas',
      chartTitleArabic: 'المناطق الرطبة',
      projection: 'Mollweide',
      chartScale: '1:120,000',
      region: 'Central-East',
      releaseDate: '2023-09-25'
    },
    {
      Name: 'Map M',
      cellName: 'Nu',
      chartTitle: 'Wind Patterns',
      chartTitleArabic: 'أنماط الرياح',
      projection: 'Robinson',
      chartScale: '1:250,000',
      region: 'Coastal North',
      releaseDate: '2024-10-16'
    },
    {
      Name: 'Map N',
      cellName: 'Xi',
      chartTitle: 'Transportation Routes',
      chartTitleArabic: 'طرق النقل',
      projection: 'Mercator',
      chartScale: '1:70,000',
      region: 'Eastern Corridor',
      releaseDate: '2024-11-03'
    },
    {
      Name: 'Map O',
      cellName: 'Omicron',
      chartTitle: 'Population Distribution',
      chartTitleArabic: 'توزيع السكان',
      projection: 'Equal Earth',
      chartScale: '1:90,000',
      region: 'North-Central',
      releaseDate: '2024-12-21'
    }
  ]

}
