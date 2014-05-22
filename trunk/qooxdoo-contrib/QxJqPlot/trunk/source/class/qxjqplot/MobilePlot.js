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
 * var plot = new qxjqplot.MobilePlot(data,options,plugins);
 * </pre>
 */
qx.Class.define("qxjqplot.MobilePlot", {
    extend : qx.ui.mobile.core.Widget,
    include: [qxjqplot.MPlot],

    /**
     * @param dataSeries {Array} data array to plot
     * @param getOptions {Callback|Map} wither an option map or a function returning the option map after being called with jQuery.jqplot as an argument.
     * @param pluginArr  {Array} array of plugin base names. (use "cursor" not "jqplot.cursor.js")
     *
     */
    construct: function(dataSeries,getOptions,pluginArr){
        this.base(arguments);
        this._setup(dataSeries, getOptions, pluginArr);
    },

    members : {

      _getDomElement: function () {
        return this.getContentElement();
      },

      _bindResizeEvent: function (plot, id, dataSeries, options) {
        qx.event.Registration.addListener(window, "resize",
            qx.lang.Function.bind(this._redraw, this, plot, id, dataSeries, options), this);
      }
    }
});
