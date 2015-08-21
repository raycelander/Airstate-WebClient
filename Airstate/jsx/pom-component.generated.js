﻿// @hash v2-107D9C981BA31DD2A4906A830A3951B2
// Automatically generated by ReactJS.NET. Do not edit, your changes will be overridden.
// Version: 1.5.4 (build 4f3b0f1)
// Generated at: 21.08.2015 10:55:46
///////////////////////////////////////////////////////////////////////////////
var PointOfMeasureComponent = React.createClass({displayName: "PointOfMeasureComponent",
    getInitialState: function(){
       return {
         currentData: Object,
       }
    },
    componentWillMount: function () {
     this.setState({ currentTempPre: 0,
                currentTempPost: 0,
                currentHum: 0,
                displayTempPre: 0,
                displayTempPost: 0,
                displayTempMax: 0,
                displayTempMin: 0,
                displayHum: 0,
                defaultView: true
            });
      this.updateData();
    },
    componentWillReceiveProps: function () {
        this.updateData();
    }, 
    getDefaultProps: function () {
        return {
            station: ''
        }
    },
    render: function () {
        return (
		    React.createElement("div", {className: "col-xs-6 col-sm-3 pom-component"}, 
				React.createElement("div", {className: "full-circle", onClick: this.handleClick}, 
				 this.state.defaultView ?
				React.createElement("div", null, 
					React.createElement("div", {className: "inner"}, 
						React.createElement("img", {src: "svg/sunny.svg", className: "weather-pictogram"}), 
					    React.createElement("span", {id: 'currentTempPre'+this.props.station}, this.state.currentTempPre), 
                        React.createElement("span", null, "."), 
                        React.createElement("span", {id: 'currentTempPost'+this.props.station}, this.state.currentTempPost), 
                        React.createElement("span", null, " °C")
					), 
					React.createElement("div", {className: "inner smallfont"}, 
					  React.createElement("span", {id: 'currentHum'+this.props.station}, this.state.displayHum), React.createElement("span", null, " %")
					)
					)
				: React.createElement("div", {className: "inner normal-line"}, 
					React.createElement("div", {className: "smallfont"}, this.state.displayTempMax.time), 
				    React.createElement("div", null, this.state.displayTempMax.val, "°"), 
					React.createElement("hr", null), 
				    React.createElement("div", null, this.state.displayTempMin.val, "°"), 
					React.createElement("div", {className: "smallfont"}, this.state.displayTempMin.time)
				  )
				  ), 
				  React.createElement("div", {className: "pom-title"}, this.props.station)
			)
        );
    },
	updateData: function(){
        var app = this;
		var pom = this.props.station;
        new Measurements().getCurrent(this.props.station).then(function(result){

            var temp =  result.temp["toString"]();
            var tempPre = temp.substring(0,temp.indexOf("."));
            var tempPost = temp.substring(temp.indexOf(".")+1);
            var hum =   result.hum.toFixed(0)["toString"]();
           
            app.setState({ currentTempPre: tempPre,
                            currentTempPost: tempPost,
                            currentHum: hum,
                            displayTempPre: 0,
                            displayTempPost: 0,
                            displayHum: 0,
                        });
            app.countUp();
        });
        new Measurements().getPeakTemp(this.props.station).then(function(result){
           app.setState({ 
                        displayTempMax: result.max,
                        displayTempMin: result.min,
                    });
        });
  	},
    countUp: function(){
         var options = {
              useEasing : true, 
              useGrouping : true, 
              separator : ',', 
              decimal : '.', 
              prefix : '', 
              suffix : '' 
            };
        var currentTempPreCounter = new CountUp("currentTempPre"+this.props.station, 0, parseInt(this.state.currentTempPre), 0, 1.5, options);
        var currentTempPostCounter = new CountUp("currentTempPost"+this.props.station, 0, parseInt(this.state.currentTempPost), 0, 1.5, options);
        var currentHumCounter = new CountUp("currentHum"+this.props.station, 0, parseInt(this.state.currentHum), 0, 1.5, options);
        var refreshIntervalId = setInterval(function(){ 
            currentTempPreCounter.start();
            currentTempPostCounter.start();
            currentHumCounter.start();
            clearInterval(refreshIntervalId);
         }, 500);
    },
    handleClick: function(event) {
        this.setState({defaultView : !this.state.defaultView});
        if (this.state.defaultView){
            this.setState({displayHum: this.state.currentHum});
            this.setState({displayTempPre: this.state.currentTempPre});
            this.setState({displayTempPost: this.state.currentTempPost});
        }
    },
});