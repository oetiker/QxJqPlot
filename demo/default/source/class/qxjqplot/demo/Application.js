/* ************************************************************************
   Copyright: Public Domain
************************************************************************ */

qx.Class.define("qxjqplot.demo.Application", {
    extend : qx.application.Standalone,
    members : {
    main : function() {
        this.base(arguments);
        if (qx.core.Variant.isSet("qx.debug", "on")){
            // support native logging capabilities, e.g. Firebug for Firefox
            qx.log.appender.Native;
            // support additional cross-browser console. Press F7 to toggle visibility
            qx.log.appender.Console;
        };
        var plotDemo = [{
            title: 'Data Point Highlighting',
            data: [[['23-May-08', 578.55], ['20-Jun-08', 566.5], ['25-Jul-08', 480.88], ['22-Aug-08', 509.84],
                   ['26-Sep-08', 454.13], ['24-Oct-08', 379.75], ['21-Nov-08', 303], ['26-Dec-08', 308.56],
                   ['23-Jan-09', 299.14], ['20-Feb-09', 346.51], ['20-Mar-09', 325.99], ['24-Apr-09', 386.15]]],
            options: function($jqplot){return {
                title:'Data Point Highlighting',
                axes:{
                    xaxis:{
                        renderer:$jqplot.DateAxisRenderer,
                        rendererOptions:{tickRenderer:$jqplot.CanvasAxisTickRenderer},
                        tickOptions:{
                            formatString:'%b %#d, %Y', 
                            fontSize:'10pt', 
                            fontFamily:'Tahoma', 
                            angle:-30
                        }
                    },
                    yaxis:{
                        tickOptions:{
                            formatString:'$%.2f'
                        }
                    }
                }
                // using a cursor together with plot.redraw() and multiple graphs seems not to work
                // as the cursor plugin suddenly becomes unknown.
                // ,cursor: {show: true} 
            }},
            plugins: ['dateAxisRenderer','canvasTextRenderer','canvasAxisTickRenderer'
                // ,'cursor'
            ]
        },{
            title: 'Mixed Data Input',
            data: [[[1,1], [1.5, 2.25], [2,4], [2.5,6.25], [3,9], [3.5,12.25], [4,16]],
                   [25, 17.5, 12.25, 8.6, 6.0, 4.2, 2.9],
                   [4, 25, 13, 22, 14, 17, 15]],
            options: {
               legend:{show:true}, 
               title:'Mixed Data Input Formats',
               series:[
                   {label:'Rising line', showLine:false, markerOptions:{style:'square'}},
                   {label:'Declining line'}, 
                   {label:'Zig Zag Line', lineWidth:5, showMarker:false}
               ]
           }
        },{
            title: 'Unit Revenues: Acme Traps Division',
            data: [
                [4, 2, 9, 16],
                [3, 7, 6.25, 3.125]
            ],
            options: function($jqplot){return{
                stackSeries: true,
                legend: {show: true, location: 'nw'},
                title: 'Unit Revenues: Acme Traps Division',
                seriesDefaults: {renderer: $jqplot.BarRenderer,rendererOptions: {barWidth: 50}},
                series: [{label: '1st Qtr'}, {label: '2nd Qtr'}],
                axes: {
                    xaxis: {
                        renderer: $jqplot.CategoryAxisRenderer, 
                        ticks:['Red', 'Blue', 'Green', 'Yellow']
                    }, 
                    yaxis: {
                        min: 0, 
                        max: 20, 
                        numberTicks:5, 
                        tickOptions:{formatString:'$%.2f'}
                    }
                }

            }},
            plugins: ['categoryAxisRenderer','barRenderer']
        },{
            title: 'Pie Chart with Legend and sliceMargin',
            data: [[['frogs',3], ['buzzards',7], ['deer',2.5], ['turkeys',6], ['moles',5], ['ground hogs',4]]],
            options: function($jqplot){return{
                title: 'Pie Chart with Legend and sliceMargin',
                seriesDefaults:{renderer:$jqplot.PieRenderer, rendererOptions:{sliceMargin:8}},
                legend:{show:true}
            }},
            plugins: ['pieRenderer']
        }
        ];

        var x=0;
        var y=0;
        for (var i=0;i<plotDemo.length;i++){
            var win = new qx.ui.window.Window(plotDemo[i].title);
            win.set({
                width: 600,
                height: 400,
                showMinimize: false,
                showClose: false,
                layout: new qx.ui.layout.Grow()
            });
            this.getRoot().add(win, {left:x+=60, top:y+=50});
            win.open();
            var plot = new qxjqplot.Plot(
                plotDemo[i].data,
                plotDemo[i].options,
                plotDemo[i].plugins
            );
            win.add(plot);
        }
    }
}});
