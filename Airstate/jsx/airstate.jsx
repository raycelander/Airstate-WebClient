  var isValidPullDown = false;
  var pullDownStartPos = 0;
  var AirState = React.createClass({
          render: function(){
          return (
            <div className="airstate container" onTouchEnd={this.onTouchEnd} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}>
              <div className="row pulldown" ref="pulldown"></div>
              <div className="row">
                <div className="col-md-1 header">
                      <img src="svg/airstate_full.svg" width="300" />
                 </div>
              </div>
              <div className="row">
          			<PointOfMeasureComponent station="Aussen"/>
              </div>      
              <div className="row">	
                <div className="col-md-12">
                  <HighchartsBar measurement="temp" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <HighchartsBar measurement="hum" />
                </div>
              </div>
            </div>
          );
        },
        onTouchEnd: function(event) {
          if (isValidPullDown){
            this.refs.pulldown.getDOMNode().style.height = "0px";
            React.render(<AirState/>, document.getElementById('airstate'));
          }
        },
        handleTouchStart: function(event) {
            isValidPullDown = window.scrollY == 0;
            pullDownStartPos = event.touches[0].clientY;
        },
        handleTouchMove: function(event) {
            this.refs.pulldown.getDOMNode().style.height = event.touches[0].clientY - pullDownStartPos + "px";
        },
      });
React.initializeTouchEvents(true);
React.render(<AirState/>, document.getElementById('airstate'));
