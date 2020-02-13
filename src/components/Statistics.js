import React from "react";
import { Link } from 'react-router-dom';
import { AppContext } from "./../context/ContextProvider";
import Navbar from "./Navbar";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


class Statistics extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            listofUserPosts: []
        }

    }

    componentDidMount() {
        this.retrieveUsers()
        .then(()=>this.retrieveUserPosts())
        .then(()=>this.createChart());
    }

    createChart() {

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        chart.data = this.getXaxisData();
        console.log(chart.data);
        // Create axes

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "user";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "posts";
        series.dataFields.categoryX = "user";
        series.name = "posts";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
    }

    retrieveUsers() {
        /*hemos cambiado estos métodos con respecto a los que teníamos en Users porque antes teníamos funciones síncronas pero ahora, devolviendo
        promesas, tenemos una función asíncrona. Esto lo necesitamos para el componentDidMount; forzamos la secuencia para que primero se ejecuten las
        funciones asíncronas y por último getXaxisData, que es síncrona. El motor solo tiene un thread, así que primero ejecuta los bloques síncronos
        . Antes estas funciones lo eran, así que cuando llega al fetch, el motor lo deja en la pila de asíncronos. Misma situación con retrieveUserPosts,
        y después getXaxisData. El problema era que al buscar los datos del array que le pasamos con getXaxisData, éste está vacío. Ejecuta todo el
        createChart y después pasa a la pila de código asíncrono, todavía pendiente. Una vez convertidas las funciones a asíncronas forzamos a seguir
        un orden secuencial, dejando la síncrona como última pero asegurándonos de que las otras se hayan resuelto. De ahí que en ambos métodos tengamos
        un resolve();
        */
        return new Promise((resolve, reject) => {
            fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then((json) => {
                this.context.setListOfUsers([...json]);
                this.context.setOriginalUsers([...json]);
                resolve();
            })
        });
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

    getXaxisData() {
        let usersAndPosts = [];
        this.context.listOfUsers.forEach(user => {
            let userAndPosts = { user: user.name };
            userAndPosts.posts = this.context.listOfUserPosts.filter(post => user.id == post.userId).length;
            usersAndPosts.push(userAndPosts);
        });
        return usersAndPosts;
    }



    render() {
        return <div><Navbar />
            <div id="chartdiv"></div>
        </div>
    }

}

export default Statistics;