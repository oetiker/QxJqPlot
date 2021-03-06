/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "qxjqplot.demo"
 *
 * @asset(qxjqplot.mobile-demo/*)
 */
qx.Class.define("qxjqplot.mobile-demo.Application",
{
  extend : qx.application.Mobile,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    plotDemo : null,
    pages : [],
      
    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     */
    main : function()
    {
        // Call super class
        this.base(arguments);

        // Enable logging in debug variant
        if (qx.core.Environment.get("qx.debug"))
        {
          // support native logging capabilities, e.g. Firebug for Firefox
          qx.log.appender.Native;
          // support additional cross-browser console. Press F7 to toggle visibility
          qx.log.appender.Console;
        }

        /*
        -------------------------------------------------------------------------
          Below is your actual application code...
          Remove or edit the following code to create your application.
        -------------------------------------------------------------------------
        */

        this.plotDemo = [{
            title: 'Data Point Highlighting',
            data: [[['23-May-08', 578.55], ['20-Jun-08', 566.5], ['25-Jul-08', 480.88], ['22-Aug-08', 509.84],
                   ['26-Sep-08', 454.13], ['24-Oct-08', 379.75], ['21-Nov-08', 303], ['26-Dec-08', 308.56],
                   ['23-Jan-09', 299.14], ['20-Feb-09', 346.51], ['20-Mar-09', 325.99], ['24-Apr-09', 386.15]]],
            options: function($jqplot){return {
                title:'Data Point Highlighting with Trendline',
                seriesDefaults: {
                    trendline: {
                        show: true
                    }
                },
                highlighter: {
                    sizeAdjust: 10,
                    tooltipLocation: 'n',
                    tooltipAxes: 'y',
                    tooltipFormatString: '<b><i><span style="color:red;">hello</span></i></b> %.2f',
                    useAxesFormatters: false
                },
                axes:{
                    xaxis:{
                        renderer:$jqplot.DateAxisRenderer,
                        rendererOptions:{tickRenderer:$jqplot.CanvasAxisTickRenderer},
                        tickOptions:{
                            formatString:'%Y-%m-%d',
                            fontSize:'8pt',
                            fontFamilly: 'sans-serif',
                            angle:-20,
                            enableFontSupport: true
                        }
                    },
                    yaxis:{
                        tickOptions:{
                            formatString:'$%.2f'
                        }
                    }
                },
                cursor: {
                    show: true
                }
            }},
            plugins: ['highlighter','dragable',
                      'dateAxisRenderer', 'trendline',
                      'cursor'
            ]
        },{
            title: 'Mixed Data Input',
            data: [[[1,1], [1.5, 2.25], [2,4], [2.5,6.25], [3,9], [3.5,12.25], [4,16]],
                   [25, 17.5, 12.25, 8.6, 6.0, 4.2, 2.9],
                   [4, 25, 13, 22, 14, 17, 15]],
            options: {
               legend:{show:true},
               seriesDefault: {},
               title:'Mixed Data Input Formats',
               series:[
                   {label:'Rising line', showLine:false, markerOptions:{style:'square'}},
                   {label:'Declining line'},
                   {label:'Zig Zag Line', lineWidth:5, showMarker:false}
               ]
           },
           plugins: []
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
                seriesDefaults: {renderer: $jqplot.BarRenderer,rendererOptions: {barWidth: 50}
                },
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
        },{
            title: 'Plot with Zooming and 3 Y Axes',
            plugins: ['cursor'],
            data: [
                [[0.0,85.0],[10.0,87.4],[20.0,90.0],[30.0,91.3],[40.0,93.5],[50.0,94.1],[60.0,95.4],[70.0,95.8],
                [80.0,96.1],[90.0,97.6],[100.0,97.4],[110.0,97.7],[120.0,97.9],[130.0,98.3],[140.0,97.9],[150.0,98.4],
                [160.0,99.8],[170.0,100.5],[180.0,100.4],[190.0,100.3],[200.0,102.9],[210.0,104.1],[220.0,104.4],[230.0,103.9],
                [240.0,104.4],[250.0,104.0],[260.0,103.9],[270.0,103.5],[280.0,105.4],[290.0,105.7],[300.0,105.7],[310.0,105.3],
                [320.0,105.0],[330.0,105.1],[340.0,105.0],[350.0,105.1],[360.0,104.7],[370.0,104.4],[380.0,104.3],[390.0,105.7],
                [400.0,106.4],[410.0,105.7],[420.0,105.4],[430.0,105.7],[440.0,105.7],[450.0,105.9],[460.0,105.3],[470.0,105.7],
                [480.0,105.8],[490.0,105.4],[500.0,105.4],[510.0,105.4],[520.0,105.6],[530.0,104.9],[540.0,104.8],[550.0,105.2],
                [560.0,105.2],[570.0,105.1],[580.0,104.8],[590.0,104.6],[600.0,104.3],[610.0,104.2],[620.0,104.1],[630.0,104.7],
                [640.0,104.6],[650.0,104.7],[660.0,104.6],[670.0,104.4],[680.0,106.8],[690.0,106.6],
                [700.0,106.3],[710.0,107.1],[720.0,106.2],[730.0,106.1],[740.0,106.7],[750.0,106.5],[760.0,106.8],[770.0,106.7],
                [780.0,106.6],[790.0,106.7],[800.0,106.8],[810.0,106.4],[820.0,106.7],[830.0,106.5],[840.0,106.9],[850.0,106.7],
                [860.0,106.7],[870.0,106.8],[880.0,107.1],[890.0,106.6],[900.0,106.8],[910.0,106.9],[920.0,106.8],[930.0,107.3],
                [940.0,106.9],[950.0,106.5],[960.0,107.2],[970.0,107.0],[980.0,106.9],[990.0,107.2],[1000.0,107.7],[1010.0,107.6],
                [1020.0,107.1],[1030.0,107.6],[1040.0,107.2],[1050.0,107.2],[1060.0,107.5],[1070.0,107.7],[1080.0,107.3],[1090.0,107.0],
                [1100.0,107.7],[1110.0,107.0],[1120.0,107.8],[1130.0,107.8],[1140.0,107.7],[1150.0,107.4],[1160.0,107.8],[1170.0,107.8],
                [1180.0,107.6],[1190.0,107.7],[1200.0,107.4],[1210.0,108.0],[1220.0,372.6],[1230.0,90.4],[1240.0,125.0],[1250.0,110.4],
                [1260.0,108.5],[1270.0,109.7],[1280.0,108.9],[1290.0,109.6],[1300.0,110.2],[1310.0,110.0],[1320.0,110.7],[1330.0,110.3],
                [1340.0,110.6],[1350.0,110.5],
                [1360.0,110.8],[1370.0,110.6],[1380.0,111.0],[1390.0,113.0],[1400.0,112.1],[1410.0,112.3],[1420.0,112.3],[1430.0,137.6],
                [1440.0,179.0],[1450.0,216.9],[1460.0,399.2],[1470.0,433.6],[1480.0,203.5],[1490.0,223.3],[1500.0,229.8],[1510.0,416.9],
                [1520.0,198.8],[1530.0,208.7],[1540.0,172.0],[1550.0,145.7],[1560.0,119.2],[1570.0,104.8],[1580.0,100.1],[1590.0,97.7],
                [1600.0,97.2],[1610.0,98.8],[1620.0,98.1],[1630.0,98.1],[1640.0,98.8],[1650.0,98.7],[1660.0,98.5],[1670.0,98.8],[1680.0,98.2],
                [1690.0,98.2],[1700.0,97.7],[1710.0,98.1],[1720.0,97.1],[1730.0,97.6],[1740.0,97.7],[1750.0,97.4],[1760.0,97.6],[1770.0,98.0],
                [1780.0,97.6],[1790.0,97.7],[1800.0,97.8],[1810.0,97.6],[1820.0,97.9],
                [1830.0,97.9],[1840.0,97.8],[1850.0,97.7],[1860.0,97.7],[1870.0,97.7],[1880.0,97.4],[1890.0,97.3],[1900.0,97.2],[1910.0,96.9],
                [1920.0,97.2],[1930.0,97.4],[1940.0,97.7],[1950.0,97.1],[1960.0,97.1],[1970.0,96.6],[1980.0,96.7],[1990.0,96.5],[2000.0,97.2],
                [2010.0,96.6],[2020.0,96.4],[2030.0,96.7],[2040.0,96.8],[2050.0,96.6],[2060.0,96.6],[2070.0,96.5],[2080.0,96.6],[2090.0,96.4],[2100.0,96.6],
                [2110.0,96.5],[2120.0,96.2],[2130.0,96.2],[2140.0,96.5],[2150.0,96.0],[2160.0,96.2],[2170.0,96.3],[2180.0,96.4],[2190.0,97.0],[2200.0,96.8],
                [2210.0,96.5],[2220.0,96.6],[2230.0,96.1],[2240.0,96.1],[2250.0,96.6],[2260.0,96.5],[2270.0,96.6],[2280.0,96.4],[2290.0,96.5],[2300.0,96.6],
                [2310.0,96.9],[2320.0,96.8],[2330.0,96.9],[2340.0,97.2],[2350.0,96.6],[2360.0,97.3],[2370.0,97.4],[2380.0,97.1],[2390.0,97.1],[2400.0,96.8],
                [2410.0,97.0],[2420.0,97.1],[2430.0,97.1],[2440.0,97.0],[2450.0,97.1],[2460.0,97.1],[2470.0,97.5],[2480.0,96.9],[2490.0,96.8],[2500.0,96.8],
                [2510.0,97.0],[2520.0,96.7],[2530.0,97.0],[2540.0,97.1],[2550.0,97.2],[2560.0,97.1],[2570.0,97.1],[2580.0,97.1],[2590.0,96.8],[2600.0,97.2],
                [2610.0,97.1],[2620.0,97.3],[2630.0,97.1],[2640.0,97.1],[2650.0,97.1],[2660.0,97.0],[2670.0,96.8],[2680.0,97.3],[2690.0,97.4],[2700.0,97.3],
                [2710.0,97.2],[2720.0,97.1],[2730.0,97.2],[2740.0,97.1],[2750.0,97.1],[2760.0,97.1],[2770.0,96.8],[2780.0,96.4],[2790.0,96.6],[2800.0,96.6]],
               [[0.0,1788.1],[10.0,1803.3],[20.0,1807.3],[30.0,1813.5],[40.0,1822.0],[50.0,1820.3],[60.0,1823.7],[70.0,1823.7],[80.0,1825.3],[90.0,1831.0],
                [100.0,1832.1],[110.0,1834.4],[120.0,1834.4],[130.0,1831.5],[140.0,1832.7],[150.0,1834.4],[160.0,1831.5],[170.0,1832.1],[180.0,1830.4],[190.0,1831.0],
                [200.0,1830.4],[210.0,1829.3],[220.0,1829.9],[230.0,1828.2],[240.0,1831.0],[250.0,1828.7],[260.0,1827.0],[270.0,1829.3],[280.0,1826.5],[290.0,1824.8],[300.0,1824.2],[310.0,1823.7],[320.0,1823.7],[330.0,1823.7],[340.0,1825.3],[350.0,1822.0],[360.0,1820.3],[370.0,1818.0],[380.0,1819.1],[390.0,1816.3],[400.0,1820.8],[410.0,1820.8],[420.0,1819.7],[430.0,1820.3],[440.0,1819.7],[450.0,1819.1],
                [460.0,1819.1],[470.0,1821.4],[480.0,1821.4],[490.0,1818.0],[500.0,1816.9],[510.0,1819.1],[520.0,1818.6],[530.0,1816.9],[540.0,1816.9],[550.0,1815.2],[560.0,1814.1],[570.0,1814.6],[580.0,1811.2],[590.0,1814.1],[600.0,1813.5],[610.0,1812.4],[620.0,1809.0],[630.0,1813.5],[640.0,1811.8],[650.0,1815.8],[660.0,1816.3],[670.0,1815.2],[680.0,1815.2],[690.0,1815.8],[700.0,1816.3],[710.0,1818.6],[720.0,1816.9],[730.0,1814.6],[740.0,1816.3],[750.0,1814.1],[760.0,1812.9],[770.0,1812.9],[780.0,1811.2],[790.0,1812.4],[800.0,1815.2],[810.0,1812.4],[820.0,1813.5],[830.0,1811.8],[840.0,1811.2],[850.0,1812.9],[860.0,1809.0],[870.0,1811.2],[880.0,1816.9],[890.0,1815.2],[900.0,1813.5],[910.0,1812.9],
                [920.0,1815.8],[930.0,1819.1],[940.0,1818.0],[950.0,1816.3],[960.0,1818.0],[970.0,1815.2],[980.0,1818.6],[990.0,1815.2],[1000.0,1822.5],[1010.0,1822.5],[1020.0,1816.9],[1030.0,1816.3],[1040.0,1817.4],[1050.0,1816.9],[1060.0,1811.8],[1070.0,1818.6],[1080.0,1818.6],[1090.0,1815.2],[1100.0,1816.9],[1110.0,1815.8],[1120.0,1815.8],[1130.0,1816.9],[1140.0,1815.2],[1150.0,1815.2],[1160.0,1818.0],[1170.0,1817.4],[1180.0,1818.0],[1190.0,1819.1],[1200.0,1817.4],[1210.0,1822.5],[1220.0,1313.9],[1230.0,1694.5],[1240.0,1891.3],[1250.0,1813.5],[1260.0,1827.0],[1270.0,1831.5],[1280.0,1827.6],[1290.0,1832.1],[1300.0,1831.5],[1310.0,1829.9],[1320.0,1834.4],[1330.0,1831.0],[1340.0,1827.6],
                [1350.0,1829.3],[1360.0,1832.1],[1370.0,1834.9],[1380.0,1834.9],[1390.0,1839.4],[1400.0,1830.4],[1410.0,1832.7],[1420.0,1833.8],[1430.0,1847.9],[1440.0,1770.6],[1450.0,1668.0],[1460.0,1279.5],[1470.0,1138.5],[1480.0,1724.4],[1490.0,1571.0],[1500.0,1740.8],[1510.0,1326.8],[1520.0,1661.2],[1530.0,1859.2],[1540.0,1851.8],[1550.0,1885.7],[1560.0,1876.1],[1570.0,1860.3],[1580.0,1870.5],[1590.0,1851.8],[1600.0,1853.5],[1610.0,1863.7],[1620.0,1854.1],[1630.0,1855.8],[1640.0,1858.6],[1650.0,1857.5],[1660.0,1858.6],[1670.0,1841.7],[1680.0,1824.2],[1690.0,1817.4],[1700.0,1813.5],[1710.0,1814.6],[1720.0,1809.0],[1730.0,1806.2],[1740.0,1803.9],[1750.0,1804.5],[1760.0,1798.8],[1770.0,1793.8],[1780.0,1792.1],[1790.0,1793.2],[1800.0,1792.6],[1810.0,1787.0],[1820.0,1787.0],[1830.0,1786.4],[1840.0,1788.1],[1850.0,1784.7],
               [1860.0,1781.4],[1870.0,1780.2],[1880.0,1777.4],[1890.0,1775.7],[1900.0,1775.2],[1910.0,1775.2],[1920.0,1776.8],[1930.0,1778.0],[1940.0,1775.7],[1950.0,1769.5],[1960.0,1769.5],[1970.0,1768.4],[1980.0,1771.2],[1990.0,1770.1],[2000.0,1769.5],[2010.0,1767.8],[2020.0,1764.4],[2030.0,1764.4],[2040.0,1765.0],[2050.0,1762.7],[2060.0,1765.6],[2070.0,1763.9],[2080.0,1762.2],[2090.0,1759.9],[2100.0,1759.9],[2110.0,1762.2],[2120.0,1762.7],[2130.0,1762.2],[2140.0,1762.7],[2150.0,1759.4],[2160.0,1761.1],[2170.0,1761.6],[2180.0,1763.3],[2190.0,1765.0],[2200.0,1768.4],[2210.0,1763.3],[2220.0,1762.7],[2230.0,1759.9],[2240.0,1762.7],[2250.0,1764.4],[2260.0,1765.6],[2270.0,1766.7],[2280.0,1763.3],[2290.0,1763.3],[2300.0,1763.9],[2310.0,1762.7],[2320.0,1762.7],[2330.0,1767.3],[2340.0,1767.8],[2350.0,1765.6],[2360.0,1766.1],
                [2370.0,1766.7],[2380.0,1766.7],[2390.0,1765.0],[2400.0,1765.0],[2410.0,1765.0],
                [2420.0,1765.0],[2430.0,1765.6],[2440.0,1765.6],[2450.0,1763.3],[2460.0,1767.8],
                [2470.0,1767.8],[2480.0,1765.0],[2490.0,1761.6],[2500.0,1761.6],[2510.0,1762.7],[2520.0,1763.3],
                [2530.0,1763.3],[2540.0,1763.9],[2550.0,1765.0],[2560.0,1766.1],[2570.0,1765.6],[2580.0,1766.7],[2590.0,1765.6],
                [2600.0,1768.4],[2610.0,1766.7],[2620.0,1764.4],[2630.0,1764.4],[2640.0,1766.1],[2650.0,1766.1],[2660.0,1766.1],
                [2670.0,1763.9],[2680.0,1765.6],[2690.0,1765.6],[2700.0,1765.6],[2710.0,1765.0],[2720.0,1765.6],[2730.0,1766.1],
                [2740.0,1767.3],[2750.0,1766.7],[2760.0,1762.2],[2770.0,1754.9],[2780.0,1750.9],[2790.0,1750.3],[2800.0,1748.1]],
               [[0.0,1503],[10.0,3006],[20.0,3005],[30.0,1505],[40.0,1505],[50.0,3015],[60.0,1503],
                [70.0,3006],[80.0,3006],[90.0,1503],[100.0,1503],[110.0,1503],[120.0,1500],[130.0,1503],
                [140.0,752],[150.0,1503],[160.0,1503],[170.0,1503],[180.0,1505],[190.0,1503],[200.0,1503],
                [210.0,3006],[220.0,1503],[230.0,1503],[240.0,1502],[250.0,1503],[260.0,3005],[270.0,1500],[280.0,1502],[290.0,1502],[300.0,1502],[310.0,752],[320.0,1502],[330.0,1502],[340.0,1504],[350.0,1502],[360.0,1502],[370.0,1501],[380.0,1502],[390.0,501],[400.0,1501],[410.0,501],[420.0,751],[430.0,751],[440.0,1503],[450.0,750],[460.0,1501],[470.0,1503],[480.0,501],[490.0,1501],[500.0,1501],[510.0,501],[520.0,1501],[530.0,751],[540.0,1501],[550.0,1501],[560.0,1501],[570.0,1501],[580.0,1504],[590.0,1504],
                [600.0,1502],[610.0,751],[620.0,1501],[630.0,1501],[640.0,1501],[650.0,1501],[660.0,1504],
                [670.0,1502],[680.0,751],[690.0,751],[700.0,1501],[710.0,751],[720.0,1501],[730.0,1502],[740.0,1502],[750.0,751],[760.0,376],[770.0,1502],[780.0,1501],[790.0,1502],[800.0,1499],[810.0,1499],[820.0,750],[830.0,1499],[840.0,501],[850.0,300],[860.0,1504],[870.0,751],[880.0,1502],[890.0,1502],[900.0,1502],[910.0,751],[920.0,501],[930.0,1502],[940.0,751],[950.0,1502],[960.0,501],[970.0,1504],[980.0,751],[990.0,1502],[1000.0,751],[1010.0,1502],[1020.0,500],[1030.0,751],[1040.0,1502],[1050.0,751],[1060.0,1502],[1070.0,1502],[1080.0,751],[1090.0,751],[1100.0,1502],[1110.0,750],[1120.0,1502],[1130.0,375],[1140.0,1502],[1150.0,300],[1160.0,375],[1170.0,1499],[1180.0,300],
                [1190.0,375],[1200.0,1502],[1210.0,373],[1220.0,368],[1230.0,502],[1240.0,495],[1250.0,1475],
                [1260.0,1468],[1270.0,732],[1280.0,1461],[1290.0,1458],[1300.0,1456],[1310.0,1456],[1320.0,1451],[1330.0,1453],[1340.0,1453],[1350.0,726],[1360.0,1451],[1370.0,1451],[1380.0,1451],[1390.0,1451],[1400.0,1449],[1410.0,1449],[1420.0,1449],[1430.0,1944],[1440.0,1197],[1450.0,786],[1460.0,0],[1470.0,0],[1480.0,1079],[1490.0,1070],[1500.0,1085],[1510.0,923],[1520.0,1121],[1530.0,1293],[1540.0,1762],[1550.0,367],[1560.0,352],[1570.0,186],[1580.0,892],[1590.0,892],[1600.0,892],[1610.0,892],[1620.0,892],[1630.0,892],[1640.0,892],[1650.0,892],[1660.0,892],[1670.0,892],[1680.0,0],[1690.0,0],[1700.0,0],[1710.0,0],[1720.0,0],[1730.0,0],[1740.0,0],[1750.0,0],[1760.0,0],
                [1770.0,0],[1780.0,0],[1790.0,0],[1800.0,0],[1810.0,0],[1820.0,0],[1830.0,0],[1840.0,0],[1850.0,0],[1860.0,0],[1870.0,0],[1880.0,0],[1890.0,0],[1900.0,0],[1910.0,0],[1920.0,0],[1930.0,0],[1940.0,0],[1950.0,0],[1960.0,0],[1970.0,0],[1980.0,0],[1990.0,0],[2000.0,0],[2010.0,0],[2020.0,0],[2030.0,0],[2040.0,0],[2050.0,0],[2060.0,0],[2070.0,0],[2080.0,0],[2090.0,0],[2100.0,0],[2110.0,0],[2120.0,0],[2130.0,0],[2140.0,0],[2150.0,0],[2160.0,0],[2170.0,0],[2180.0,0],[2190.0,0],[2200.0,0],[2210.0,0],[2220.0,0],[2230.0,0],[2240.0,0],[2250.0,0],[2260.0,0],[2270.0,0],[2280.0,0],[2290.0,0],[2300.0,0],[2310.0,0],[2320.0,0],[2330.0,0],[2340.0,0],[2350.0,0],[2360.0,0],[2370.0,0],[2380.0,0],[2390.0,0],[2400.0,0],[2410.0,0],[2420.0,0],[2430.0,0],[2440.0,0],
                [2450.0,0],[2460.0,0],[2470.0,0],[2480.0,0],[2490.0,0],[2500.0,0],[2510.0,0],[2520.0,0],[2530.0,0],[2540.0,0],[2550.0,0],[2560.0,0],[2570.0,0],[2580.0,0],[2590.0,0],[2600.0,0],[2610.0,0],[2620.0,0],[2630.0,0],[2640.0,0],[2650.0,0],[2660.0,0],[2670.0,0],[2680.0,0],[2690.0,0],[2700.0,0],[2710.0,0],[2720.0,0],[2730.0,0],[2740.0,0],[2750.0,0],[2760.0,0],[2770.0,0],
                [2780.0,0.0],[2790.0,0.0],[2800.0,0.0]]
            ],
            options: {
                title:'Plot with Zooming and 3 Y Axes',
                seriesDefaults: {showMarker:false},
                series:[
                    {},
                    {yaxis:'y2axis'},
                    {yaxis:'y3axis'}
                ],
                cursor: {tooltipLocation:'sw', zoom:true, clickReset:true,showTooltipGridPosition:true,show: true},
                axesDefaults:{useSeriesColor: true},
                axes:{
                    xaxis:{min:0, max:1600},
                    yaxis:{min:0, max:600},
                    y2axis:{
                        min:1000,
                        max:2000,
                        numberTicks:9,
                        tickOptions:{showGridline:false}
                    },
                    y3axis:{}
                }
            }
        }
        ];

        for (var i=0; i < this.plotDemo.length; i++){
          var page = this.makePlot(this.plotDemo[i].data, this.plotDemo[i].options, this.plotDemo[i].plugins, this.plotDemo[i].title, i);
          this.pages.push(page);
        }

        // Add the this.pages to the page manager.
        var manager = new qx.ui.mobile.page.Manager(false);
        manager.addDetail(this.pages);

        // Page1 will be shown at start
        this.pages[0].show();
    },

    makePlot: function(data,options,plugins,title,index) {
      var page = new qx.ui.mobile.page.NavigationPage();
      page.setTitle(title);

      page.addListener("initialize", function () {
        var plot = new qxjqplot.MobilePlot(data, options, plugins);
        page.getContent().add(plot);
        if (index < this.plotDemo.length - 1) {
          var button = new qx.ui.mobile.form.Button("Next Page");
          page.getContent().add(button);

          button.addListener("tap", function () {
            this.pages[index + 1].show();
          }, this);
        }
        if (index > 0) {
          page.setShowBackButton(true);
          page.setBackButtonText("Back");
          page.addListener("back", function () {
            this.pages[index - 1].show({reverse: true});
          }, this);
        }
      }, this);
      return page;
    }
  }
});
