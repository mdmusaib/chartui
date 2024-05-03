import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from '../services/data.service';
import { AuthGuard } from '../services/auth.guard';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userInitials: string = "";
  title = 'chartui';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  isBarChart: boolean = true;
  showChart: boolean = false;
  chartData: any;
  chartType: string = this.isBarChart ? 'bar' : 'pie';
  value = 0;
  loading = true;
  constructor(private dataService: DataService, public authCheck: AuthGuard) { }

  ngOnInit() {
    // Get user's initials (example: "JS" for John Smith)
    this.userInitials = this.getUserInitials(sessionStorage.getItem('username')); // Replace with actual user data
    // this.updateChartOptions();

    try {
      this.dataService.fetchData().subscribe((response) => {
        if (response) {
          this.chartData = response;
          this.renderChart();
          this.loading = false;
          this.showChart = true;
        }
      });

    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  }

  getUserInitials(name: string): string {
    let initials = name.split(' ').map(n => n.charAt(0)).join('');
    return initials.toUpperCase();
  }

  logout() {
    this.authCheck.logout();
  }

  toggleChartType() {
    this.isBarChart = !this.isBarChart;
    this.renderChart();
  }

  renderChart() {
    const data = this.chartData;
    let pieChartData = [];
    if (!data) return;

    data.map(d => {
      pieChartData.push({
        "name": d.label, 'y': d.value
      })
    });
    this.chartOptions = {
      chart: {
        type: this.isBarChart ? 'bar' : 'pie',
        backgroundColor: '#f4f4f4',
        height: null // This allows the chart to be responsive
      },
      title: {
        text: this.isBarChart ? 'Simple Bar Chart' : 'Simple Pie Chart'
      },
      xAxis: {
        categories: this.isBarChart ? data.map(d => d.label) : null
      },
      yAxis: {
        title: {
          text: this.isBarChart ? 'Category ' : null
        }
      },
      series: [{
        data: this.isBarChart ? data.map(d => d.value) :
          pieChartData

      }]
    };
    console.log('called1', this.chartOptions);
  }
}
