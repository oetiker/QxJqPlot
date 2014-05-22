/* ************************************************************************

   Copyright:
     2010 OETIKER+PARTNER AG, Tobi Oetiker, http://www.oetiker.ch

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tobi Oetiker (oetiker)

************************************************************************ */

/* ************************************************************************

#asset(jqPlot/*)
#ignore(jQuery)
#ignore(jQuery.jqplot.config)

************************************************************************ */

/**
 * A wrapper around jqPlot. The wrapper assumes to find an unpacked copy of
 * the jqPlot distribution in resource/jqPlot. See <a
 * href='http://http://www.jqplot.com' target='_blank'>jqPlot website</a>
 * for information on how to use jqPlot.
 *
 * <pre class='javascript'>
 * var data = [[['frogs',3], ['buzzards',7], ['deer',2.5], ['turkeys',6], ['moles',5], ['ground hogs',4]]],
 * var options = function($jqplot){return{
 *     title: 'Pie Chart with Legend and sliceMargin',
 *     seriesDefaults:{renderer:$jqplot.PieRenderer, rendererOptions:{sliceMargin:8}},
 *     legend:{show:true}
 *  }};
 * var plugins = ['pieRenderer'];
 * var plot = new qxjqplot.Plot(data,options,plugins);
 * </pre>
 */
qx.Mixin.define("qxjqplot.MPlot", {

    statics : {
        INSTANCE_COUNTER : 0,
        /**
         * map of loaded scripts
         */
        LOADED: {},
        /**
         * map of objects in the process of loading a particular script
         */
        LOADING: {},
        /**
         * Default Options for graphs. They get merged (non overwriting to the graph object).
         */
        DEFAULT_OPTIONS: {
            // thanks to http://ui.openoffice.org/VisualDesign/OOoChart_colors_drafts.html
            seriesColors:  [
                '#005796', '#ffbf17', '#46b535', '#e93f80', '#bbe3ff',
                '#ff811b', '#007333', '#ffe370', '#a6004f', '#a6004f',
                '#bde734', '#0094d8', '#ffbedd'
            ],
            grid: {
                background: '#ffffff'
            },
            seriesDefaults: {
                lineWidth: 2,
                markerOptions: {
                    size: 7
                }
            }
        }
    },

    events : {
        /**
         * returns the plot object
         */
        plotCreated: 'qx.event.type.Event',
        /**
         * fires when a script is loaded
         */
        scriptLoaded: 'qx.event.type.Event'
    },

    members : {

      __useExCanvas: false,

      /**
       * @param dataSeries {Array} data array to plot
       * @param getOptions {Callback|Map} wither an option map or a function returning the option map after being called with jQuery.jqplot as an argument.
       * @param pluginArr  {Array} array of plugin base names. (use "cursor" not "jqplot.cursor.js")
       *
       */
      _setup: function (dataSeries, getOptions, pluginArr) {
          var min = '.min';
          if (qx.core.Environment.get("qx.debug")) {
            min = '';
          }
          /* I guess it would not be all that difficult to create a stripped
           * down jQuery object with all the bits required by jqPlot and use
           * this instead of full jQuery.
           */
          var codeArr = [
                "jquery" + min + ".js", "jquery.jqplot" + min + ".js"
          ];

          if (!qx.core.Environment.get('html.canvas') && qx.core.Environment.get('engine.name') == 'mshtml') {
            this.__useExCanvas = true;
            if (!window.G_vmlCanvasManager) {
              codeArr.push("excanvas" + min + ".js");
            }
          }

          if (pluginArr) {
            for (var i = 0; i < pluginArr.length; i++) {
              codeArr.push('plugins/jqplot.' + pluginArr[i] + min + '.js');
            }
          }
          this.__addCss("jquery.jqplot" + min + ".css");
          this.__loadScriptArr(codeArr, qx.lang.Function.bind(this.__addCanvas, this, dataSeries, getOptions));
      },

      /**
         * Once the jqPlot object has been created, returns a handle to the plot object
         * use the plotCreated to learn when the plot gets created.
         *
         * @return {jqPlotObject}
         */
        getPlotObject: function(){
            return this.__plotObject;
        },

        /**
         * Chain loading scripts.
         */
        __loadScriptArr: function(codeArr,handler){
            var script = codeArr.shift();
            if (script){
                if (qxjqplot.MPlot.LOADING[script]){
                    qxjqplot.MPlot.LOADING[script].addListenerOnce('scriptLoaded',function(){
                        this.__loadScriptArr(codeArr,handler);
                    },this);
                }
                else if ( qxjqplot.MPlot.LOADED[script]){
                     this.__loadScriptArr(codeArr,handler);
                }
                else {
                    qxjqplot.MPlot.LOADING[script] = this;
                    var src = qx.util.ResourceManager.getInstance().toUri("jqPlot/"+script);
                    if (qx.io.ScriptLoader){
                        var sl = new qx.io.ScriptLoader();
                        sl.load(src, function(status){
                            if (status == 'success'){
                                // this.debug("Dynamically loaded "+src+": "+status);
                                qxjqplot.MPlot.LOADED[script] = true;
                                qxjqplot.MPlot.LOADING[script] = null;
                                this.fireDataEvent('scriptLoaded',script);
                                this.__loadScriptArr(codeArr,handler);
                            }
                        },this);
                    }
                    else {
                        var req = new qx.bom.request.Script();
                        req.on('load',function() {
                            qxjqplot.MPlot.LOADED[script] = true;
                            qxjqplot.MPlot.LOADING[script] = null;
                            this.fireDataEvent('scriptLoaded',script);
                            this.__loadScriptArr(codeArr,handler);
                        },this);
                        req.open("GET", src);
                        req.send();
                    }
                }
            } else {
                handler();
            }
        },
        /**
         * Simple css loader without event support
         */
        __addCss: function(url){
            if (!qxjqplot.MPlot.LOADED[url]){
                qxjqplot.MPlot.LOADED[url]=true;
                var head = document.getElementsByTagName("head")[0];
                var el = document.createElement("link");
                el.type = "text/css";
                el.rel="stylesheet";
                el.href=qx.util.ResourceManager.getInstance().toUri("jqPlot/"+url);
                setTimeout(function() {
                    head.appendChild(el);
                }, 0);
            };
        },
        /**
         * our copy of the plot object
         */
        __plotObject: null,

        /**
         * Create the canvas once everything is renderad
         */
        __addCanvas: function(dataSeries,getOptions){
            var el = this._getDomElement();
            /* make sure the element is here yet. Else wait until things show up */
            if (el == null || el.offsetParent === null){
                this.addListenerOnce('appear',qx.lang.Function.bind(this.__addCanvas,this,dataSeries,getOptions),this);
            } else {
              /* with IE and excanvas, we have to
                 add the missing method to the canvas
                 element first since the initial loading
                 only catches elements from the original html */
                if (this.__useExCanvas) {
                   window.G_vmlCanvasManager.initElement(el);
                }

                var id = 'jqPlotId'+(qxjqplot.MPlot.INSTANCE_COUNTER++);
                qx.bom.element.Attribute.set(el, 'id', id);

                var options = qx.lang.Type.isFunction(getOptions) ? getOptions(jQuery.jqplot) : getOptions;
                qx.lang.Object.mergeWith(options,qxjqplot.MPlot.DEFAULT_OPTIONS,false);
                jQuery.jqplot.config.enablePlugins = false;
                var plot = this.__plotObject = jQuery.jqplot(id,dataSeries,options);
                this.fireDataEvent('plotCreated', plot);
              this._bindResizeEvent(plot, id, dataSeries, options);
            }
        },
        _redraw: function(plot,id,dataSeries,options) {
             // with out .flush() the plot div will not yet be
             // resized, causing the jqPlot not to render
             // properly
              qx.html.Element.flush();
              if (!this.isSeeable()){
//               // jqplot does not take kindely to being redrawn while not visible
                 return;
              }
              // since we are loading plugins dynamically
              // it could be that others have been added since the last round
              // so we have to run the preInitHooks again or some plugins might
              // try to access non accessible structures
//            for (var i=0; i<jQuery.jqplot.preInitHooks.length; i++) {
//                  jQuery.jqplot.preInitHooks[i].call(plot, id, dataSeries, options);
//            }
              plot.replot({
                  resetAxes: true
              });
         }
    }
});

