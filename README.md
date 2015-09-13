blingZ
======

[$Z](https://github.com/gameprez/blingZ) (pronounced "bling Z" or "dollar Z") is an engine for _interactives_ (i.e. interactive visualizations, simulations, or games) written using EcmaScript.6 (ES6) with no other external dependencies. It provides a lighter-weight library compared to [D3js](http://d3js.org) with less emphasis on selections and data binding and more emphasis on higher-order functions for greater reusability and cleaner code. 

For example, when using `d3` we might want to visualize one dataset representing intervals  as lines and another representing points as circles, and then have them both fade-in.

Using `d3`, this would normally lead to code snippets like:

```javascript
d3.selectAll('.blue_circle')
  .data(myData1)
  .enter()
  .append('circle')
  .attr('class', 'blue_circle')
  .style('opacity', 0)
  .attr('cx', function (d) { d.x })
  .attr('cy', function (d) { d.y })
  .attr('r', function (d) { d.r })
  .transition()
  .duration(1000)
  .ease('linear')
  .style('opacity', 1);

d3.selectAll('.red_circle')
  .data(myData2)
  .enter()
  .append('class', 'red_circle')
  .append('path')
  .style('opacity', 0)
  .attr('d', function (d) { d3.svg.line(d) })
  .transition()
  .duration(1000)
  .ease('linear')
  .style('opacity', 1);
```

which works, but has some repeated code arising from both the chaining syntax for defining transitions and also the presence of slight variations in the processing (e.g. lines vs. circles).

$Z uses higher-order functions to define the transitions instead of chaining for cleaner and more reusable code. The same example as above could be implemented as:

```javascript
$Z.fadeIn = $Z.transition({duration: 1000, ease: 'linear'}) ;
$Z.hide   = $Z.style({opacity: 0}) ;
$Z.circIn = $Z.chain($Z.hide, $Z.attr({cx: 'x', cy: 'y', r: 'r', class: 'blue_circle'})) ;
$Z.lineIn = $Z.chain($Z.hide, $Z.attr({d: $Z.svg.line, class: 'blue_circle'})) ;

$Z.addItem(myData1, 'circle', $Z.circIn)
  .addItem(myData2, 'path', $Z.lineIn) ;
```

which removes some of the repetitive boilerplate present in `d3`.

The file `index.html` included in this repository contains a demo showing an interactive stochastic dynamics simulation with 3 frictionless, non-interacting particles in a rectangular domain with inelastic boundaries with particles rendered as colored circles using SVG.

Clicking on any of the circles will randomly change their 2D velocity vectors by sampling from a uniform distribution on `[-1, 1] x [-1, 1]`.

Modify the `index.html` file to create your own interactive visualizations, simulations, and games with maximal flexibility and minimal overhead.

Load the index.html file locally to test the code in a development environment (requires a local web server such as [live-server](https://github.com/tapio/live-server) to be running).

Compile build.js using `jspm bundle-sfx --minify src/blingz` for running in a production environment.

# References

* [ES6](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts)
* [Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise)
* [Babel](http://babeljs.io/)
* [JSPM](https://github.com/jspm/jspm-cli)
* [ES6+jspm template](https://github.com/geelen/loopgifs)