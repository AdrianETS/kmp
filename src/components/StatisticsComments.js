import React from "react";
import { Link } from 'react-router-dom';
import { AppContext } from "../context/ContextProvider";
import Navbar from "./Navbar";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class StatisticsComments extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            listofUserComments: []
        }

    }

    componentDidMount() {
        this.retrieveUsers()
            .then(() => this.retrieveUserPosts())
            .then(() => this.retrieveComments())
            .then(() => this.createChart());
    }

    createChart() {

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        chart.data = this.getAxisData();
        console.log(chart.data);
        // Create axes

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "user";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "comments";
        series.dataFields.categoryX = "user";
        series.name = "comments";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
    }

    retrieveUsers() {
        return new Promise((resolve, reject) => {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then(res => res.json())
                .then((json) => {
                    //this.setState({ listOfUsers: json })
                    this.context.setListOfUsers([...json]);
                    this.context.setOriginalUsers([...json]);
                    resolve();
                })
        }
        )
    }

    retrieveUserPosts() {
        return new Promise((resolve, reject) => {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then(res => res.json())
                .then((json) => {
                    this.context.setListOfUserPosts(json)
                    resolve();
                })
        });
    }

    retrieveComments() {
        return new Promise((resolve, reject) => {
            fetch("https://jsonplaceholder.typicode.com/comments")
                .then(res => res.json())
                .then((json) => {
                    this.context.setListOfComments(json);
                    resolve();
                })
        })
    }

    getAxisData() {
        let data = []
        this.context.listOfUsers.forEach(user => {
            let userAndComments = 0;
            this.context.listOfUserPosts.forEach(post => {            
                if(user.id == post.userId) {                   
                    userAndComments += this.context.listOfComments.filter(comment => post.userId == comment.postId).length;               
                }
            });
            data.push({user:user.name, comments: userAndComments});
        });
        return data;

    }

    render() {
        return <div><Navbar />
            <div id="chartdiv"></div>
        </div>
    }

}

export default StatisticsComments;