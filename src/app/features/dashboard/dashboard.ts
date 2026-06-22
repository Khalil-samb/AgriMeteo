import { Component } from '@angular/core';
import { CardMap } from '../map/card-map/card-map';
import { ListRegions } from '../list-regions/list-regions';
import { DashbordPanel } from '../dashbord-panel/dashbord-panel';

@Component({
  selector: 'app-dashboard',
  imports: [CardMap, ListRegions, DashbordPanel ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
