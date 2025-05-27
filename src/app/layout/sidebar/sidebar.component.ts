import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DropDownProperty {
  title: string;
  releaseDate: Date;
  EditionNo: number;
  UpdatedNo: number;
}

interface DropDownPropertyWithExpand extends DropDownProperty {
  expanded?: boolean;
}

interface MiniDropDown {
  name: string;
  expanded: boolean;
  dropDownProperties: DropDownProperty[];
}

interface DropDownItem {
  name: string;
  expanded: boolean;
  miniDropDown: MiniDropDown[];
}

interface DropDown {
  name: string;
  expanded: boolean;
  dropDownItems: DropDownItem[];
}

interface SidebarItem {
  name: string;
  expanded: boolean;
  dropdown: DropDown[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  selectedProperties: DropDownPropertyWithExpand[] = [];
  selectedChartName: string = '';
  selectedMiniChart: MiniDropDown | null = null;

  sidebarData: SidebarItem[] = [
    {
      name: 'India',
      expanded: false,
      dropdown: [
        {
          name: 'East Coast',
          expanded: false,
          dropDownItems: [
            {
              name: '1500000',
              expanded: false,
              miniDropDown: [
                {
                  name: 'Chart 01',
                  expanded: false,
                  dropDownProperties: [
                    {
                      title: 'Indian chart',
                      releaseDate: new Date(),
                      EditionNo: 5,
                      UpdatedNo: 2
                    }
                  ]
                },
                {
                  name: 'Chart 02',
                  expanded: false,
                  dropDownProperties: []
                }
              ]
            },
            {
              name: '1500000',
              expanded: false,
              miniDropDown: [
                {
                  name: 'Chart 01',
                  expanded: false,
                  dropDownProperties: [
                    {
                      title: 'Indian chart',
                      releaseDate: new Date(),
                      EditionNo: 2,
                      UpdatedNo: 4
                    }
                  ]
                },
                {
                  name: 'Chart 02',
                  expanded: false,
                  dropDownProperties: []
                }
              ]
            }
          ]
        },
        {
          name: 'West Coast',
          expanded: false,
          dropDownItems: []
        }
      ]
    }
  ];

  toggleExpand(item: any): void {
    item.expanded = !item.expanded;

    if (!item.expanded) {
      this.collapseChildren(item);
    }
  }

  collapseChildren(item: any): void {
    if (item.dropdown) {
      for (let dropdown of item.dropdown) {
        dropdown.expanded = false;
        this.collapseChildren(dropdown);
      }
    }

    if (item.dropDownItems) {
      for (let dropDownItem of item.dropDownItems) {
        dropDownItem.expanded = false;
        this.collapseChildren(dropDownItem);
      }
    }

    if (item.miniDropDown) {
      for (let mini of item.miniDropDown) {
        mini.expanded = false;
        this.collapseChildren(mini);
      }
    }

    if (item.dropDownProperties) {
      for (let prop of item.dropDownProperties) {
        prop.expanded = false;
      }
    }
  }

  onSingleCheckboxSelect(mini: MiniDropDown, event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.selectedProperties = mini.dropDownProperties.map(p => ({ ...p, expanded: false }));
      this.selectedChartName = mini.name;
      this.selectedMiniChart = mini;
    } else {
      this.onCancel(); 
    }
  }

  onCancel(): void {
    this.selectedProperties = [];
    this.selectedChartName = '';
    this.selectedMiniChart = null;
  }

  isChartSelected(mini: MiniDropDown): boolean {
    return this.selectedMiniChart === mini;
  }

  togglePropertyExpand(prop: DropDownPropertyWithExpand): void {
    prop.expanded = !prop.expanded;
  }
}
