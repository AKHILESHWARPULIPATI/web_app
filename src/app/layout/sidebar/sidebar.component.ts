import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DropDownProperty {
  name: string;
  releaseDate: Date;
  finalDate: Date;
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

  sidebarData: SidebarItem[] = [
    {
      name: 'India',
      expanded: false,
      dropdown: [
        {
          name: 'east coast',
          expanded: false,
          dropDownItems: [
            {
              name: '1500000',
              expanded: false,
              miniDropDown: [
                {
                  name: 'chart1',
                  expanded: false,
                  dropDownProperties: [
                    {
                      name: 'title',
                      releaseDate: new Date('2023-01-01'),
                      finalDate: new Date('2023-12-31'),
                    }
                  ]
                },
                {
                  name: 'chart 2',
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
                  name: 'chart1',
                  expanded: false,
                  dropDownProperties: [
                    {
                      name: 'title',
                      releaseDate: new Date('2023-01-01'),
                      finalDate: new Date('2023-12-31'),
                    }
                  ]
                },
                {
                  name: 'chart 2',
                  expanded: false,
                  dropDownProperties: []
                }
              ]
            }
          ]
        },
        {
          name: 'west coast',
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


  onDoubleClick(properties: DropDownProperty[], chartName: string): void {
    this.selectedProperties = properties.map(p => ({ ...p, expanded: false }));
    this.selectedChartName = chartName;
  }

  togglePropertyExpand(prop: DropDownPropertyWithExpand): void {
    prop.expanded = !prop.expanded;
  }
}
