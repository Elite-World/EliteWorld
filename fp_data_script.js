<script>
      try {
overviewWrap=function() {
  const transA = {
    'SATR': 'SAT阅读',
    'SATM': 'SAT数学',
    'ACTC': 'ACT综合',
    'ACTE': 'ACT英语',
    'ACTM': 'ACT数学',
    'men': '男生',
    'women': '女生',
    'white': '白人',
    'asian': '亚裔',
    'latio': '拉丁裔',
    'others': '太平洋岛民及其他',
    'african': '非裔',
    'nr': '留学生',
    'underf': '本科新生',
    'undernf': '本科老生',
    'undert': '本科转学',
    'grad': '研究生',
    'nondegree': '无学位',
    'weapona': '持枪逮捕',
    'druga': '毒品逮捕',
    'liquora': '酗酒逮捕',
    'weapond': '持枪记过',
    'drugd': '毒品记过',
    'liquord': '酗酒记过',
    'domest': '家暴',
    'dating': '约会犯罪',
    'stalk': '跟踪',
    'murd': '谋杀',
    'negm': '过失杀人',
    'rape': '强奸',
    'fondl': '性扰',
    'inces': '乱伦',
    'robbe': '抢劫',
    'agga': '袭击',
    'burgla': '盗窃',
    'vehic': '偷车',
    'arson': '纵火',
    'fire': '宿舍火灾'
  };
  const overview_canvas_width = document.getElementById('overview-canvas').clientWidth;
  const width = 975;
  const height = 700;
  const brand = 'By 美国续航教育 forwardpathway.com';
  const bottomLabelMargin = {
    left: 12,
    top: 2
  };
  let svg, g, gMap, gPause, gPlay, stageLabel, topLabel, bottomLabel, bottomLabelRect, us, data, brandArray, currentStage, timeoutVal;
  const stages = ['mapZoomInOut', 'general1', 'general2', 'ranking', 'admin', 'scores', 'comp_mw', 'comp_level', 'comp_race', 'comp_nr', 'international', 'degree_under', 'degree_master', 'degree_doctor', 'safty', 'end'];
  const zoom = d3.zoom()
    .scaleExtent([1, 512])
    .on("zoom", zoomed);
  const stageDelay = [3000, 3000, 4000, 3000, 3000, 5000, 3000, 3000, 3000, 1000, 6000, 3000, 3000, 3000, 3000, 3000];
  const stageClearG = [true, false, false, true, false, false, true, false, false, false, true, true, false, false, true, false]
  intial();

  function handleBottomLabel(labelString) {
    if (labelString && labelString.length > 0) {
      bottomLabel.text(labelString);
      const bottomLabelBox = bottomLabel.node().getBBox();
      bottomLabelRect
        .attr('display', null)
        .attr('x', bottomLabelBox.x - bottomLabelMargin.left)
        .attr('y', bottomLabelBox.y - bottomLabelMargin.top)
        .attr('width', bottomLabelBox.width + 2 * bottomLabelMargin.left)
        .attr('height', bottomLabelBox.height + 2 * bottomLabelMargin.top)
    } else {
      bottomLabel.text('');
      bottomLabelRect.attr('display', 'none');
    }
  }

  function intial() {
    currentStage = -1;
    const img = d3.select('#overview-canvas img')
      .style('opacity', 1);
    const div = d3.selectAll('#overview-canvas div')
      .style('opacity', 1);
    const radius = 80;
    svg = d3.select('#overview-canvas')
      .style('height', overview_canvas_width * height / width + 'px')
      .append("svg")
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0)
      .attr("viewBox", [0, 0, width, height]);
    gMap = svg.append('g')
      .attr('transform', `translate(0,${(height-610)/2})`);
    topLabel = svg.append('text').attr('text-anchor', 'middle').attr('x', width / 2).attr('y', '1.5em').attr('font-size', '1.5em');
    bottomLabelRect = svg.append('rect').attr('fill', '#555').style('filter', 'url(#rect_drop-shadow)');
    bottomLabel = svg.append('text').attr('text-anchor', 'middle').attr('x', width / 2).attr('y', height - 20).attr('font-size', '1.2em').attr('fill', 'white');

    const gFirst = svg.append('g').attr('fill', 'white').attr('class', 'stageG').append('g');
    const playCircle = gFirst.append('circle')
      .attr('cx', width / 2 - radius * 3)
      .attr('cy', height / 2 + 20)
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 15)
      .attr('pointer-events', 'all')
      .attr('cursor', 'pointer')
      .on('click', startPlay)
      .on('mouseover', function() {
        playCircle.attr('fill', '#0996f2');
        playText.attr('fill', '#0996f2');
      })
      .on('mouseout', function() {
        playCircle.attr('fill', 'none');
        playText.attr('fill', 'white');
      });
    const triangle = d3.symbol().type(d3.symbolTriangle).size(radius * 40);
    gFirst.append('path').attr('d', triangle)
      .attr('transform', `translate(${width/2-radius*3},${height/2+20}) rotate(90)`)
      .attr('pointer-events', 'none')

    const playText = gFirst.append('text').attr('font-size', '7em')
      .attr('text-anchor', 'middle')
      .text('点击播放')
      .attr('transform', `translate(${width/2+radius*1.2},${height/2+60})`)
      .attr('cursor', 'pointer')
      .on('click', startPlay)
      .on('mouseover', function() {
        playCircle.attr('fill', '#0996f2');
        playText.attr('fill', '#0996f2')
      })
      .on('mouseout', function() {
        playCircle.attr('fill', 'none')
        playText.attr('fill', 'white')
      });

    gFirst.append('text')
      .attr('font-size', width / (document.title.split("(")[0].length + 20))
      .attr('text-anchor', 'middle')
      .text('通过数据，用一分钟时间带您深入了解' + document.title.split("(")[0])
      .attr('transform', `translate(${width/2},${height/2-150})`)
    const brandArray = brand.split('');
    gFirst.append('text')
      .attr('font-size', '1em')
      .attr('text-anchor', 'end')
      .attr('transform', `translate(${width-50},${height-150})`)
      .selectAll('tspan')
      .data(brandArray)
      .enter().append('tspan')
      .text(d => d)

    function startPlay() {
      let promises = [d3.json('https://www.forwardpathway.com/d3v7/maps/states-albers-10m.json'), d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/overview_all_20230920.php?name='+ location.pathname.substring(1)), gFirst.attr('opacity', 1).transition().duration(1000).attr('opacity', 0).end(), img.style('opacity', 1).transition().duration(1000).style('opacity', 0).end(), div.style('opacity', 1).transition().duration(1000).style('opacity', 0).end()];
      Promise.all(promises).then(([us2, data2]) => {
        us = us2;
        data = data2;
        setupControls();
        gFirst.remove();
        timeoutVal = setTimeout(handleNext, 100);
      })
    }

    let rect_defs = svg.append("defs");
    let rect_filter = rect_defs.append("filter")
      .attr("id", "rect_drop-shadow")
      .attr('width', '300%')
      .attr("height", "300%");
    rect_filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 5)
      .attr("result", "blur");
    rect_filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 5)
      .attr("dy", 5)
      .attr("result", "offsetBlur");
    var feMerge = rect_filter.append("feMerge");
    feMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

  }

  function setupControls() {
    const fillColor = '#414A4C'
    const gCtl = svg.append('g').attr('fill', fillColor)
    const radiusCtl = 12,
      heightCtl = radiusCtl * 2;
    const trianglCtlSymbol = d3.symbol().type(d3.symbolTriangle).size(radiusCtl * radiusCtl * 0.5);
    const circleCtlPrev = gCtl.append('circle')
      .attr('cx', width * 0.95 - radiusCtl * 12)
      .attr('cy', heightCtl)
      .attr('r', radiusCtl)
      .attr('fill', 'white')
      .attr('stroke', fillColor)
      .attr('stroke-width', radiusCtl * 0.25)
      .attr('pointer-events', 'all')
      .attr('cursor', 'pointer')
      .on('click', function() {
        handlePrev();
      })
      .on('mouseover', function() {
        circleCtlPrev.attr('fill', '#0996f2');
      })
      .on('mouseout', function() {
        circleCtlPrev.attr('fill', 'white');
      })
    const triangleCtlPrev = gCtl.append('path').attr('d', trianglCtlSymbol)
      .attr('transform', `translate(${width*0.95-radiusCtl*12+radiusCtl*0.25},${heightCtl}) rotate(-90)`)
      .attr('pointer-events', 'none')
    const barCtlPrev = gCtl.append('rect')
      .attr('width', radiusCtl * 0.4)
      .attr('height', radiusCtl)
      .attr('x', width * 0.95 - radiusCtl * 12 - radiusCtl * 0.6)
      .attr('y', heightCtl - radiusCtl * 0.5)
      .attr('pointer-events', 'none')
    stageLabel = gCtl.append('text')
      .attr('x', width * 0.95 - radiusCtl * 12 + radiusCtl * 3)
      .attr('y', heightCtl + 5)
      .attr('font-weight', 'bold')
      .attr('font-size', radiusCtl * 1.2)
      .attr('text-anchor', 'middle')
    const circleCtlNext = gCtl.append('circle')
      .attr('cx', width * 0.95 - radiusCtl * 6)
      .attr('cy', heightCtl)
      .attr('r', radiusCtl)
      .attr('fill', 'white')
      .attr('stroke', fillColor)
      .attr('stroke-width', radiusCtl * 0.25)
      .attr('pointer-events', 'all')
      .attr('cursor', 'pointer')
      .on('mouseover', function() {
        circleCtlNext.attr('fill', '#0996f2');
      })
      .on('mouseout', function() {
        circleCtlNext.attr('fill', 'white');
      })
      .on('click', function() {
        handleNext();
      })
    const triangleCtlNext = gCtl.append('path').attr('d', trianglCtlSymbol)
      .attr('transform', `translate(${width*0.95-radiusCtl*6-radiusCtl*0.25},${heightCtl}) rotate(90)`)
      .attr('pointer-events', 'none')
    const barCtlNext = gCtl.append('rect')
      .attr('width', radiusCtl * 0.4)
      .attr('height', radiusCtl)
      .attr('x', width * 0.95 - radiusCtl * 6 + radiusCtl * 0.2)
      .attr('y', heightCtl - radiusCtl * 0.5)
      .attr('pointer-events', 'none')
    const circleCtlPause = gCtl.append('circle')
      .attr('cx', width * 0.95 - radiusCtl * 3)
      .attr('cy', heightCtl)
      .attr('r', radiusCtl)
      .attr('fill', 'white')
      .attr('stroke', fillColor)
      .attr('stroke-width', radiusCtl * 0.25)
      .attr('pointer-events', 'all')
      .attr('cursor', 'pointer')
      .on('mouseover', function() {
        circleCtlPause.attr('fill', '#0996f2');
      })
      .on('mouseout', function() {
        circleCtlPause.attr('fill', 'white');
      })
      .on('click', function() {
        if (gPlay.attr('opacity') == 0) {
          if (timeoutVal) {
            clearTimeout(timeoutVal);
            timeoutVal = null;
          }
          gPause.attr('opacity', 0)
          gPlay.attr('opacity', 1)
        } else {
          timeoutVal = setTimeout(handleNext, 100);
          gPause.attr('opacity', 1)
          gPlay.attr('opacity', 0)
        }

      })
    gPlay = gCtl.append('g').attr('opacity', 0)
    gPause = gCtl.append('g').attr('opacity', 1)
    const rectCtlPause1 = gPause.append('rect')
      .attr('x', width * 0.95 - radiusCtl * 3 - radiusCtl * 0.3 - radiusCtl * 0.2)
      .attr('y', heightCtl - radiusCtl * 0.55)
      .attr('width', radiusCtl * 0.4)
      .attr('height', radiusCtl * 1.1)
      .attr('pointer-events', 'none')
    const rectCtlPause2 = gPause.append('rect')
      .attr('x', width * 0.95 - radiusCtl * 3 + radiusCtl * 0.3 - radiusCtl * 0.2)
      .attr('y', heightCtl - radiusCtl * 0.55)
      .attr('width', radiusCtl * 0.4)
      .attr('height', radiusCtl * 1.1)
      .attr('pointer-events', 'none')
    const trianglePlaySymbol = d3.symbol().type(d3.symbolTriangle).size(radiusCtl * radiusCtl * 0.64);
    const trianglePlay = gPlay.append('path').attr('d', trianglePlaySymbol)
      .attr('transform', `translate(${width*0.95-radiusCtl*3},${heightCtl}) rotate(90)`)
      .attr('pointer-events', 'none')

    const circleCtlStop = gCtl.append('circle')
      .attr('cx', width * 0.95)
      .attr('cy', heightCtl)
      .attr('r', radiusCtl)
      .attr('fill', 'white')
      .attr('stroke', fillColor)
      .attr('stroke-width', radiusCtl * 0.25)
      .attr('pointer-events', 'all')
      .attr('cursor', 'pointer')
      .on('mouseover', function() {
        circleCtlStop.attr('fill', '#0996f2');
      })
      .on('mouseout', function() {
        circleCtlStop.attr('fill', 'white');
      })
      .on('click', function() {
        if (timeoutVal) {
          clearTimeout(timeoutVal)
        }
        svg = svg.remove();
        intial();
      })
    const rectCrlStop = gCtl.append('rect')
      .attr('x', width * 0.95 - radiusCtl * 0.5)
      .attr('y', heightCtl - radiusCtl * 0.5)
      .attr('width', radiusCtl)
      .attr('height', radiusCtl)
      .attr('pointer-events', 'none')

  }

  function handlePrev() {
    if (timeoutVal) {
      clearTimeout(timeoutVal);
      timeoutVal = null;
    }
    currentStage--;
    if (currentStage < 0) {
      currentStage = stages.length - 1;
    }
    if (!stageClearG[currentStage]) {
      handlePrev();
    } else {
      showStage(currentStage);
    }
  }

  function handleNext() {
    currentStage++;
    if (currentStage > stages.length - 1) {
      currentStage = 0;
    }
    if (timeoutVal && currentStage == stages.length - 1) {
      clearTimeout(timeoutVal);
      timeoutVal = null;
    }
    showStage(currentStage);
    if (timeoutVal) {
      clearTimeout(timeoutVal);
      timeoutVal = setTimeout(handleNext, stageDelay[currentStage]);
    }
  }
  let generalVs = {
    map: null
  };
  let rankVs = {
    margin: {
      left: 70,
      right: 70,
      top: 60,
      bottom: 100
    },
  };
  let compVs = {
    gg: [],
    tempG: null,
    path: null,
    pie: d3.pie().value(d => d.value).padAngle(0.04).sort(null),
    colors: d3.scaleOrdinal().domain(['men', 'women', "white", "asian", "latio", "others", "african", "nr", "underf", "undernf", "undert", "grad", "nondegree"]).range(['#589dcd', '#ff8e64', "#f1e2c8", "#cfb5a0", "#955b45", "#714341", "#3b2d34", "#77bd98", "#80B9E1", "#549CD0", "#3386C1", "#05CBAE", "#828282"]),
    radius: height / 3,
    arc: d3.arc().innerRadius(height / 6).outerRadius(height / 3 - 1),
    arcLabel: d3.arc().innerRadius(height / 3 * 1.05).outerRadius(height / 3 * 1.05)
  };
  let degreeVs = {};
  const stageFuncs = {
    mapZoomInOut: function() {
      topLabel.text('');
      handleBottomLabel(data.cname + '位于' + data.state + ', ' + data.city + '市');
      g = gMap.append('g')
        .attr('class', 'stageG')
      const projection = d3.geoAlbersUsa()
        .scale(1300)
        .translate([975 / 2, 610 / 2]);
      const path = d3.geoPath();

      const country = topojson.feature(us, us.objects.nation);
      const states = topojson.feature(us, us.objects.states);
      generalVs.map = g.append("g")
      generalVs.map
        .attr("fill", "#b3d8f2")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .join("path")
        .attr("d", path)
        .attr('class', 'mapStates');
      const mapPath = generalVs.map.append("path")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

      d3.selectAll('.mapStates').each(function(d) {
        if (d.properties.name == data.estate) {
          const [
            [x0, y0],
            [x1, y1]
          ] = path.bounds(d);
          d3.select(this).style("fill", "#87c2eb");
          g.transition().duration(750).delay(1000)
            .call(
              zoom.transform,
              d3.zoomIdentity
              .translate(975 / 2, 610 / 2)
              .scale(Math.min(128, 0.9 / Math.max((x1 - x0) / 975, (y1 - y0) / 610)))
              .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
            );
        }
      });
      [generalVs.schoolX, generalVs.schoolY] = projection([data.long, data.lat]);
      [generalVs.schoolXSign, generalVs.schoolYSign] = [generalVs.schoolX > width / 2 ? -1 : 1, generalVs.schoolY > height / 2];
      const schoolCircle1 = g.append('circle')
        .attr('class', 'schoolLocation1')
        .attr('r', 0)
        .attr('cx', generalVs.schoolX)
        .attr('cy', generalVs.schoolY)
        .attr('fill', '#f4a107')
        .style('filter', 'url(#rect_drop-shadow)')
        .transition().duration(1000).ease(d3.easeBounceOut)
        .attr('r', 8)

      const schoolCircle2 = g.append('circle')
        .attr('class', 'schoolLocation2')
        .attr('r', 0)
        .attr('cx', generalVs.schoolX)
        .attr('cy', generalVs.schoolY)
        .attr('fill', 'none')
        .attr('stroke', '#f4a107')
        .attr('stroke-width', 2)
        .transition().duration(1000).ease(d3.easeBounceOut)
        .attr('r', 12)
    },
    general1: function() {
      g.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(g.node()).invert([975 / 2, 610 / 2])
      );
      topLabel.text('');
      handleBottomLabel('');
      const schoolRect = g.append('rect').attr('opacity', 0)
        .attr('fill', '#0e75bb')
        .style('filter', 'url(#rect_drop-shadow)')
      const schoolText = g.append('text')
        .attr('text-anchor', 'middle')
        .attr('font-size', '1.2em')
        .attr('opacity', 0)
        .attr('fill', 'white')
      schoolText.text(data.cname)
        .append('tspan').attr('x', 0).attr('dy', '1.4em')
        .text(data.name)
        .append('tspan').attr('x', 0).attr('dy', '1.4em')
        .text(data.ranking_year + (data.type == 2 ? 'USNews文理学院排名：' : 'USNews排名：') + data.ranking)

      generalVs.schoolTextBox = schoolText.node().getBBox();
      schoolText.attr('transform', `translate(${generalVs.schoolX+generalVs.schoolXSign*(100+generalVs.schoolTextBox.width/2+10)},${generalVs.schoolY+(generalVs.schoolYSign?-80-generalVs.schoolTextBox.height:80)})`)

      schoolRect.attr('x', generalVs.schoolTextBox.x - 10)
        .attr('y', generalVs.schoolYSign ? generalVs.schoolTextBox.y - 5 + generalVs.schoolTextBox.height + 10 : generalVs.schoolTextBox.y - 5)
        .attr('width', generalVs.schoolTextBox.width + 20)
        .attr('height', 0)
        .attr('transform', `translate(${generalVs.schoolX+generalVs.schoolXSign*(100+generalVs.schoolTextBox.width/2+10)},${generalVs.schoolY+(generalVs.schoolYSign?-80-generalVs.schoolTextBox.height:80)})`)

      const schoolRectX = generalVs.schoolX + generalVs.schoolXSign * (100);
      const schoolRectY = generalVs.schoolY + (generalVs.schoolYSign ? generalVs.schoolTextBox.y - (80 - 5) : generalVs.schoolTextBox.y + 80 - 5);

      const schoolPath = generalVs.map.append('path')
        .attr('stroke', '#0e75bb')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .style('filter', 'url(#rect_drop-shadow)')
        .attr('d', 'M' + generalVs.schoolX + ',' + generalVs.schoolY + 'L' + (schoolRectX) + ',' + (schoolRectY))
      const schoolPathLength = schoolPath.node().getTotalLength();
      schoolPath.attr("stroke-dasharray", schoolPathLength + " " + schoolPathLength)
        .attr("stroke-dashoffset", schoolPathLength)
        .transition().duration(500)
        .delay(1500)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .on('end', function() {
          schoolRect.attr('opacity', 1)
            .transition().duration(500)
            .attr('y', generalVs.schoolTextBox.y - 5)
            .attr('height', generalVs.schoolTextBox.height + 10)
            .on('end', function() {
              schoolText.transition().duration(500).attr('opacity', 1);
            })
        })
    },
    general2: function() {
      topLabel.text('');
      handleBottomLabel('');
      const schoolRect2 = g.append('rect').attr('opacity', 0)
        .attr('fill', '#00ae88')
        .style('filter', 'url(#rect_drop-shadow)')
      const schoolText2 = g.append('text')
        .attr('text-anchor', 'middle')
        .attr('font-size', '1.2em')
        .attr('opacity', 0)
        .attr('fill', 'white')
      const schoolPath2 = generalVs.map.append('path');
      const schoolYSign2 = Math.abs(generalVs.schoolY + (generalVs.schoolYSign ? -1 : 1) * (100 + generalVs.schoolTextBox.height) - height / 2) > 0.2 * height ? (!generalVs.schoolYSign) : generalVs.schoolYSign;
      var schoolTextBox2;
      const heightoffset = generalVs.schoolYSign == schoolYSign2 ? generalVs.schoolTextBox.height + 30 : 0;

      schoolText2.text('学校性质：' + data.charactor)
        .append('tspan').attr('x', 0).attr('dy', '1.4em')
        .text('宗教信仰：' + data.affliation)
        .append('tspan').attr('x', 0).attr('dy', '1.4em')
        .text('本科学费：$' + d3.format(',')(data.tuition_out_under) + '/年')
        .append('tspan').attr('x', 0).attr('dy', '1.4em')
        .text('研究生学费：$' + d3.format(',')(data.tuition_out_grad) + '/年')
        .append('tspan').attr('x', 0).attr('dy', '1.4em')
        .text('学生教授比：' + data.s2f + ':1')

      schoolTextBox2 = schoolText2.node().getBBox();
      schoolText2.attr('transform', `translate(${generalVs.schoolX+generalVs.schoolXSign*(100+schoolTextBox2.width/2+10)},${generalVs.schoolY+(schoolYSign2?-80-heightoffset-schoolTextBox2.height:80+heightoffset)})`)

      schoolRect2.attr('x', schoolTextBox2.x - 10)
        .attr('y', generalVs.schoolYSign ? schoolTextBox2.y - 5 + schoolTextBox2.height + 10 : schoolTextBox2.y - 5)
        .attr('width', schoolTextBox2.width + 20)
        .attr('height', 0)
        .attr('transform', `translate(${generalVs.schoolX+generalVs.schoolXSign*(100+schoolTextBox2.width/2+10)},${generalVs.schoolY+(schoolYSign2?-80-heightoffset-schoolTextBox2.height:80+heightoffset)})`)

      const schoolRectX2 = generalVs.schoolX + generalVs.schoolXSign * (100);
      const schoolRectY2 = generalVs.schoolY + (schoolYSign2 ? schoolTextBox2.y - (80 + heightoffset - 5) : schoolTextBox2.y + 80 + heightoffset - 5);


      schoolPath2.attr('stroke', '#00ae88')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .style('filter', 'url(#rect_drop-shadow)')
        .attr('d', 'M' + generalVs.schoolX + ',' + generalVs.schoolY + 'L' + (schoolRectX2) + ',' + (schoolRectY2))
      const schoolPathLength2 = schoolPath2.node().getTotalLength();
      schoolPath2.attr("stroke-dasharray", schoolPathLength2 + " " + schoolPathLength2)
        .attr("stroke-dashoffset", schoolPathLength2)
        .transition().duration(500)
        .delay(500)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .on('end', function() {
          schoolRect2.attr('opacity', 1)
            .transition().duration(500)
            .attr('y', schoolTextBox2.y - 5)
            .attr('height', schoolTextBox2.height + 10)
            .on('end', function() {
              schoolText2.transition().duration(500).attr('opacity', 1);
            })
        })
    },
    ranking: function() {
      g = svg.append('g').attr('class', 'stageG')
        .attr('transform', `translate(${rankVs.margin.left},${rankVs.margin.top})`);;
      topLabel.text('排名及录取率变化');
      handleBottomLabel(data.ranking_year + '最新排名：' + data.ranking);
      rankVs.innerHeight = height - rankVs.margin.top - rankVs.margin.bottom;
      rankVs.innerWidth = width - rankVs.margin.left - rankVs.margin.right;
      rankVs.xScale = d3.scaleLinear().domain(d3.extent(data.ranking_admin, d => d.year)).range([0, rankVs.innerWidth]);
      const y_rank_extend = d3.extent(data.ranking_admin.map(d => d.rank));
      const y_rank_diff = 0.1 * Math.abs(y_rank_extend[1] - y_rank_extend[0]);
      rankVs.yScale_rank = d3.scaleLinear().domain([y_rank_extend[0] - y_rank_diff, y_rank_extend[1] + y_rank_diff])
        .range([0, rankVs.innerHeight]).nice();
      const xAxisFormat = d => d + '年';
      rankVs.xAxis = d3.axisBottom(rankVs.xScale)
        .tickSize(-rankVs.innerHeight)
        .tickFormat(xAxisFormat);
      rankVs.xAxisG = g.append('g');
      rankVs.xAxisG.call(rankVs.xAxis)
        .attr('transform', `translate(0,${rankVs.innerHeight})`);
      rankVs.xAxisG.selectAll('text')
        .attr('transform', 'translate(0,15) rotate(-35)');
      const y_rate_map = data.ranking_admin.map(d => d.rate).concat(data.ranking_admin.map(d => d.rate2));
      rankVs.yScale_rate = d3.scaleLinear().domain(d3.extent(y_rate_map)).nice()
        .range([rankVs.innerHeight, 0]);
      const yAxis2Ticks = rankVs.yScale_rank.ticks()
        .filter(Number.isInteger);
      rankVs.yAxis = d3.axisLeft(rankVs.yScale_rate)
        .tickSize(-rankVs.innerWidth)
        .ticks(6)
        .tickPadding(10)
        .tickFormat(d3.format('.1%'));
      rankVs.yAxisG = g.append('g').attr('class', 'adm_rate');
      rankVs.yAxisG.call(rankVs.yAxis);
      rankVs.yAxisLabelText = rankVs.yAxisG
        .append('text')
        .attr('font-size', '1.5em')
        .attr('y', -50)
        .attr('x', -rankVs.innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('录取率');
      rankVs.yAxis2 = d3.axisRight(rankVs.yScale_rank)
        .tickSize(0)
        .tickValues(yAxis2Ticks)
        .tickPadding(10)
        .tickFormat(d3.format('d'));

      rankVs.yAxisG2 = g.append('g');
      rankVs.yAxisG2.attr('transform', `translate(${rankVs.innerWidth},0)`)
        .call(rankVs.yAxis2);
      rankVs.yAxisLabelText2 = rankVs.yAxisG2
        .append('text')
        .attr('font-size', '1.5em')
        .attr('y', -45)
        .attr('x', rankVs.innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', 'rotate(90)')
        .attr('text-anchor', 'middle')
        .text('排名');
      rankVs.lineGenerator_rank = d3.line()
        .x(d => rankVs.xScale(d.year))
        .y(d => rankVs.yScale_rank(d.rank))
        .curve(d3.curveStep);
      rankVs.line_rank = g.append('path')
        .attr('stroke-width', 4)
        .attr('fill', 'none')
        .attr('stroke', '#f7e02c')
        .style('filter', 'url(#rect_drop-shadow)')
        .attr('d', rankVs.lineGenerator_rank(data.ranking_admin.filter(d => d.rank != null)));
      const line_rankLength = rankVs.line_rank.node().getTotalLength();
      rankVs.line_rank.attr("stroke-dasharray", line_rankLength + " " + line_rankLength)
        .attr("stroke-dashoffset", line_rankLength)
        .transition().duration(line_rankLength)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
      rankVs.bullet_rank = g.append('g')
        .attr('class', 'rectGroup')
        .selectAll('.rect_rank')
        .data(data.ranking_admin.filter(d => d.rank != null))
        .enter()
        .append('rect')
        .attr('class', 'rect_rank')
        .attr('stroke', '#f7e02c')
        .attr('fill', '#f7e02c')
        .style('filter', 'url(#rect_drop-shadow)')
        .attr('width', 16)
        .attr('height', 16)
        .attr('y', d => rankVs.yScale_rank(d.rank) - 8)
        .attr('x', d => rankVs.xScale(d.year) - 8)
        .attr('opacity', 0)
      rankVs.bullet_rank.transition().duration(300)
        .delay((d, i) => line_rankLength / data.ranking_admin.length * (i + 1))
        .attr('opacity', 1)
    },
    admin: function() {
      const rateArray = data.ranking_admin.filter(d => d.rate2 > 0);
      const rateYear = rateArray[rateArray.length - 1].year;
      const rate_men = rateArray[rateArray.length - 1].rate;
      const rate_women = rateArray[rateArray.length - 1].rate2;
      handleBottomLabel(rateYear + '年男生录取率: ' + d3.format('.2%')(rate_men) + '，女生录取率: ' + d3.format('.2%')(rate_women))
      rankVs.lineGenerator_rate = d3.line()
        .x(d => rankVs.xScale(d.year))
        .y(d => rankVs.yScale_rate(d.rate))
        .curve(d3.curveMonotoneX);
      rankVs.line_rate = g.append('path')
        .attr('class', 'adm_rate')
        .attr('stroke-width', 4)
        .attr('fill', 'none')
        .attr('stroke', '#589dcd')
        .style('filter', 'url(#rect_drop-shadow)')
        .attr('d', rankVs.lineGenerator_rate(data.ranking_admin.filter(d => d.rate > 0)));
      const line_rate_length = rankVs.line_rate.node().getTotalLength();
      rankVs.line_rate.attr("stroke-dasharray", line_rate_length + " " + line_rate_length)
        .attr("stroke-dashoffset", line_rate_length)
        .transition().duration(line_rate_length)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
      rankVs.bullet_rate = g.selectAll('.men-adm-rate-circle')
        .data(data.ranking_admin.filter(d => d.rate > 0))
        .enter()
        .append('circle')
        .attr('class', 'men-adm-rate-circle')
        .attr('stroke', '#589dcd')
        .attr('fill', 'white')
        .attr('r', 8)
        .attr('cy', d => rankVs.yScale_rate(d.rate))
        .attr('cx', d => rankVs.xScale(d.year))
        .attr('opacity', 0)
        .style('filter', 'url(#rect_drop-shadow)')
      rankVs.bullet_rate.transition().duration(300)
        .delay((d, i) => line_rate_length / data.ranking_admin.length * (i + 1))
        .attr('opacity', 1);

      rankVs.lineGenerator_rate2 = d3.line()
        .x(d => rankVs.xScale(d.year))
        .y(d => rankVs.yScale_rate(d.rate2))
        .curve(d3.curveMonotoneX);
      rankVs.line_rate2 = g.append('path')
        .attr('class', 'adm_rate')
        .attr('stroke-width', 4)
        .attr('fill', 'none')
        .attr('stroke', '#f78085')
        .attr('d', rankVs.lineGenerator_rate2(data.ranking_admin.filter(d => d.rate2 > 0)));
      const line_rate_length2 = rankVs.line_rate2.node().getTotalLength();
      rankVs.line_rate2.attr("stroke-dasharray", line_rate_length2 + " " + line_rate_length2)
        .attr("stroke-dashoffset", line_rate_length2)
        .style('filter', 'url(#rect_drop-shadow)')
        .transition().duration(line_rate_length2)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
      rankVs.bullet_rate2 = g.selectAll('.women-adm-rate-circle')
        .data(data.ranking_admin.filter(d => d.rate2 > 0))
        .enter()
        .append('circle')
        .attr('class', 'women-adm-rate-circle')
        .attr('stroke', '#f78085')
        .attr('fill', 'white')
        .style('filter', 'url(#rect_drop-shadow)')
        .attr('r', 8)
        .attr('cy', d => rankVs.yScale_rate(d.rate2))
        .attr('cx', d => rankVs.xScale(d.year))
        .attr('opacity', 0)
      rankVs.bullet_rate2.transition().duration(300)
        .delay((d, i) => line_rate_length2 / data.ranking_admin.length * (i + 1))
        .attr('opacity', 1);
    },
    scores: function() {
      if (data.scores.filter(d => d.start).length > 0) {
        const g2 = g.append('g')
          .attr('transform', `translate(0,${rankVs.innerWidth/2-rankVs.margin.top})`);
        handleBottomLabel('');
        rankVs.xAxis.tickSize(-rankVs.innerHeight / 2);
        rankVs.xAxisG.transition().duration(1000).call(rankVs.xAxis).attr('transform', `translate(0,${rankVs.innerHeight/2})`);
        rankVs.yScale_rank.range([0, rankVs.innerHeight / 2]);
        rankVs.yScale_rate.range([rankVs.innerHeight / 2, 0]);
        rankVs.yAxisG.transition().duration(1000).call(rankVs.yAxis);
        rankVs.yAxisG2.transition().duration(1000).call(rankVs.yAxis2);
        rankVs.line_rank.transition().duration(1000).attr('d', rankVs.lineGenerator_rank(data.ranking_admin.filter(d => d.rank != null)));
        rankVs.bullet_rank.transition().duration(1000).attr('y', d => rankVs.yScale_rank(d.rank) - 8);
        rankVs.line_rate.transition().duration(1000).attr('d', rankVs.lineGenerator_rate(data.ranking_admin.filter(d => d.rate > 0)));
        rankVs.line_rate2.transition().duration(1000).attr('d', rankVs.lineGenerator_rate2(data.ranking_admin.filter(d => d.rate2 > 0)));
        rankVs.bullet_rate.transition().duration(1000).attr('cy', d => rankVs.yScale_rate(d.rate));
        rankVs.bullet_rate2.transition().duration(1000).attr('cy', d => rankVs.yScale_rate(d.rate2));
        rankVs.yAxisLabelText.transition().duration(1000).attr('x', -rankVs.innerHeight / 4)
        rankVs.yAxisLabelText2.transition().duration(1000).attr('x', rankVs.innerHeight / 4)

        topLabel.text('排名、录取率 VS 录取成绩要求');
        const xScale_score = d3.scaleLinear().domain([0, 1]).range([0, rankVs.innerWidth]);
        const yScale_score = d3.scaleBand().range([0, rankVs.innerHeight / 2]).padding(0.08).domain(data.scores.filter(d => d.start).map(d => transA[d.name]));
        const yAxisG_score = g2.append('g')
        const yAxis_score = d3.axisLeft(yScale_score)
          .tickSizeOuter(0)
          .tickSize(-rankVs.innerWidth);
        yAxisG_score.transition().duration(500).delay(1000).call(yAxis_score);
        yAxisG_score.selectAll('.tick').select('line')
          .transition().duration(500).delay(1000)
          .attr('stroke-width', yScale_score.bandwidth() / 2)
          .attr('stroke', '#aaa');
        yAxisG_score.select('.domain').remove();
        yAxisG_score.selectAll('.tick text').attr('dx', 65)
          .attr('font-size', '14px')
          .attr('font-weight', 'bold')

        g2.append('path').attr('d', `M${0},${0} L${0},${rankVs.innerHeight/2}`)
          .attr('stroke', 'black')
          .attr('opacity', 0)
          .transition().duration(500).delay(1000)
          .attr('opacity', 1)
        const score_required = g2
          .selectAll('.score_required')
          .data(data.scores.filter(d => d.start));
        score_required.enter()
          .append('rect')
          .attr('class', 'score_required')
          .attr('rx', 10)
          .attr('fill', '#589dcd')
          .style('filter', 'url(#rect_drop-shadow)')
          .attr('x', xScale_score(0.2))
          .attr('y', d => yScale_score(transA[d.name]))
          .attr('height', yScale_score.bandwidth())
          .attr('width', function(d) {
            const scoreT = d.end > 36 ? 800 : 36;
            return xScale_score(d.end / scoreT) - xScale_score(d.start / scoreT);
          }).attr('opacity', 0)
          .transition().duration(500).delay(1000)
          .attr('opacity', 1)
          .transition().duration(2000)
          .attr('x', function(d) {
            const scoreT = d.end > 36 ? 800 : 36;
            return xScale_score(d.start / scoreT);
          })
        const score_labels = g2.selectAll('.score-labels')
          .data(data.scores.filter(d => d.start));
        score_labels.enter().append('text')
          .attr('class', 'score-labels')
          .attr('text-anchor', function(d) {
            const scoreT = d.end > 36 ? 800 : 36;
            if ((d.end - d.start) / scoreT <= 0.04 && d.end / scoreT >= 0.96) {
              return 'end'
            } else {
              return 'middle'
            }
          })
          .attr('dx', function(d) {
            const scoreT = d.end > 36 ? 800 : 36;
            if ((d.end - d.start) / scoreT <= 0.04 && d.end / scoreT >= 0.96) {
              return (xScale_score(d.end / scoreT) - xScale_score(d.start / scoreT)) / 2
            } else {
              return 0
            }
          })
          .attr('font-size', '12px')
          .attr('fill', 'white')
          .text(d => d.start + '-' + d.end)
          .attr('y', d => yScale_score(transA[d.name]) + yScale_score.step() / 2)
          .attr('x', function(d) {
            const scoreT = d.end > 36 ? 800 : 36;
            return xScale_score(0.2) + (xScale_score(d.end / scoreT) - xScale_score(d.start / scoreT)) / 2;
          })
          .attr('opacity', 0)
          .transition().duration(500).delay(1000)
          .attr('opacity', 1)
          .transition().duration(2000)
          .attr('x', function(d) {
            const scoreT = d.end > 36 ? 800 : 36;
            return (xScale_score(d.start / scoreT) + xScale_score(d.end / scoreT)) / 2;
          })
      } else {
        handleNext();
      }

    },
    comp_mw: function() {
      g = svg.append('g').attr('class', 'stageG')
      compVs.gg[1] = g.append('g').attr('transform', `translate(${width/2},${height/2})`);
      compVs.arcs = compVs.pie(data.student_comp.mw);
      compVs.arcData = compVs.gg[1].attr("stroke", "white")
        .selectAll(".piePath1")
        .data(compVs.arcs)
      updatePie(1, 0);
      topLabel.text(data.cname + '学生组成');
      const sMen = data.student_comp.mw[0].value;
      const sWomen = data.student_comp.mw[1].value;
      const sTotal = sMen + sWomen;
      handleBottomLabel('男女生比例 ' + Math.round(sMen / sTotal * 100) + ':' + Math.round(sWomen / sTotal * 100));
    },
    comp_level: function() {
      if (compVs.gg[1]) {
        compVs.gg[1].transition().duration(1000)
          .attr('transform', `scale(0.4) translate(${compVs.radius*1.5},${compVs.radius*2})`)
      }
      compVs.gg[2] = g.append('g').attr('transform', `translate(${width/2+160},${height/2})`);
      compVs.arcs = compVs.pie(data.student_comp.degrees);
      compVs.arcData = compVs.gg[2].attr("stroke", "white").selectAll(".piePath2").data(compVs.arcs);
      handleBottomLabel('不同学位学生组成');
      updatePie(2, 1000);
    },
    comp_race: function() {
      if (compVs.gg[2]) {
        compVs.gg[2].transition().duration(1000)
          .attr('transform', `scale(0.4) translate(${compVs.radius*1.5},${compVs.radius*2+height})`)
      }
      compVs.gg[3] = g.append('g').attr('transform', `translate(${width/2+160},${height/2})`);
      compVs.arcs = compVs.pie(data.student_comp.races);
      compVs.arcData = compVs.gg[3].attr("stroke", "white").selectAll(".piePath3").data(compVs.arcs);
      handleBottomLabel('学校多元化程度');
      updatePie(3, 1000);
    },
    comp_nr: function() {
      handleBottomLabel(data.international[data.international.length - 1].year + '年共有国际留学生' + d3.format(',')(data.international[data.international.length - 1].value) + '人');
      g.selectAll('path').filter(d => d && d.data.name != 'nr')
        .transition().duration(1000)
        .attrTween('d', function(d) {
          var i = d3.interpolate(d.endAngle, d.startAngle);
          return function(t) {
            d.endAngle = i(t);
            return compVs.arc(d);
          }
        }).remove();
      g.selectAll('.pieText').attr('opacity', 1)
        .transition().duration(1000)
        .attr('opacity', 0).remove();
    },
    international: function() {
      compVs.gg = [];
      const Ri = compVs.radius / 2,
        Ro = compVs.radius - 1;
      const margin = {
        left: 90,
        right: 30,
        top: 60,
        bottom: 100
      };
      let delayV = 500;
      const innerHeight = height - margin.top - margin.bottom;
      const innerWidth = width - margin.left - margin.right;
      let path = null;
      g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .attr('stroke', null)
        .attr('class', 'stageG');
      topLabel.text(data.cname + '留学生人数近15年变化');

      const xScale = d3.scaleBand()
        .range([0, innerWidth])
        .domain(data.international.map(d => d.year))
        .padding(0.4);
      const xAxis = d3.axisBottom(xScale)
        .tickPadding(10)
        .tickFormat(d => d + '年');
      const xAxisG = g.append('g').attr('class', 'xAxis')
        .attr('transform', `translate(0,${innerHeight})`)
        .transition().duration(1000)
        .call(xAxis)
        .selectAll('text')
        .attr('transform', `translate(${(xScale.bandwidth()-12)/2},0) rotate(-45)`)
        .attr('font-size', '1.2em')
        .style('text-anchor', 'end');

      const yScale = d3.scaleLinear()
        .range([innerHeight, 0])
        .domain(d3.extent(data.international, d => d.value))
        .nice();
      const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .ticks(5)
        .tickPadding(10)

      const yAxisG = g.append('g').attr('class', 'yAxis')
        .transition().duration(1000)
        .call(yAxis)
        .selectAll('text')
        .attr('font-size', '1.2em');
      const yAxisLabelText = g
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', -55)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('留学生人数');
      if (compVs.path) {
        delayV = 2000
        const startAngle = compVs.path.datum().startAngle;
        const endAngle = compVs.path.datum().endAngle;
        const diffAngle = endAngle - startAngle;
        const n = 20;
        let arcPoints = [];
        for (var i = 0; i < n; i++) {
          let arcX = Ro * Math.sin(startAngle + diffAngle * i / n);
          let arcY = -Ro * Math.cos(startAngle + diffAngle * i / n);
          arcPoints[i] = [arcX, arcY];
          arcX = Ro * Math.sin(endAngle) + (Ri - Ro) * Math.sin(endAngle) * i / n;
          arcY = -Ro * Math.cos(endAngle) + (Ro - Ri) * Math.cos(endAngle) * i / n;
          arcPoints[n + i] = [arcX, arcY];
          arcX = Ri * Math.sin(endAngle - diffAngle * i / n);
          arcY = -Ri * Math.cos(endAngle - diffAngle * i / n);
          arcPoints[2 * n + i] = [arcX, arcY];
          arcX = Ri * Math.sin(startAngle) + (Ro - Ri) * Math.sin(startAngle) * i / n;
          arcY = -Ri * Math.cos(startAngle) + (Ri - Ro) * Math.cos(startAngle) * i / n;
          arcPoints[3 * n + i] = [arcX, arcY];
        }

        const arcPath = g.append('path').attr('d', 'M' + arcPoints.join('L') + 'Z')
          .attr('fill', '#77bd98')
          .style('filter', 'url(#rect_drop-shadow)')
          .attr('transform', `translate(${width/2-margin.left+160},${height/2-margin.top})`)
        compVs.tempG.remove();
        compVs.tempG = null;
        compVs.path = null;
        const pathR = {
          X1: xScale(data.international[data.international.length - 1].year) - (width / 2 - margin.left + 160),
          X2: xScale(data.international[data.international.length - 1].year) - (width / 2 - margin.left + 160) + xScale.bandwidth(),
          Y1: yScale(data.international[data.international.length - 1].value) - (height / 2 - margin.top),
          Y2: innerHeight - (height / 2 - margin.top)
        }

        let rectPoints = [];
        const rectStart = diffAngle > (Math.PI / 4) ? 0 : 3
        for (var i = 0; i < n; i++) {
          rectPoints[n * ((rectStart) % 4) + i] = [pathR.X1, pathR.Y2 + (pathR.Y1 - pathR.Y2) * i / n];
          rectPoints[n * ((rectStart + 1) % 4) + i] = [pathR.X1 + (pathR.X2 - pathR.X1) * i / n, pathR.Y1];
          rectPoints[n * ((rectStart + 2) % 4) + i] = [pathR.X2, pathR.Y1 + (pathR.Y2 - pathR.Y1) * i / n];
          rectPoints[n * ((rectStart + 3) % 4) + i] = [pathR.X2 + (pathR.X1 - pathR.X2) * i / n, pathR.Y2];
        }
        arcPath.transition().duration(2000).attr('d', 'M' + rectPoints.join('L') + 'Z')
      }

      const rectGroup = g.selectAll('rect').data(data.international);
      rectGroup.enter().append('rect')
        .attr('x', d => xScale(d.year))
        .attr('y', innerHeight)
        .attr('height', 0)
        .attr('width', xScale.bandwidth())
        .attr('fill', '#77bd98')
        .style('filter', 'url(#rect_drop-shadow)')
        .transition().duration(1000).delay((d, i) => delayV + i * 100)
        .attr('y', d => yScale(d.value))
        .attr('height', d => innerHeight - yScale(d.value))
    },
    degree_under: function() {
      topLabel.text(data.cname + '各专业毕业人数分布');
      handleBottomLabel('');
      degreeVs.color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.degrees.children.length + 1));
      const margin = {
        left: 50,
        right: 0,
        top: 60,
        bottom: 0
      };
      degreeVs.radius = (height - margin.top) / 6;
      degreeVs.maxStringLength = 8;
      degreeVs.transitonDuration = 750;
      const format = d3.format(",d");
      degreeVs.arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(degreeVs.radius * 1.5)
        .innerRadius(d => d.y0 * degreeVs.radius)
        .outerRadius(d => Math.max(d.y0 * degreeVs.radius, d.y1 * degreeVs.radius - 1));
      g = svg.append("g").attr('class', 'stageG')
        .attr("transform", `translate(${degreeVs.radius*3+margin.left},${(height+margin.top) / 2})`);
      degreeVs.labelCanvas = g.append('g')
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .attr('font-size', '0.9em');
      degreeVs.centerLabel = g.append('text')
        .attr('text-anchor', 'middle')
        .attr('font-size', '1.5em');
      degreeVs.salaryCanvas = g.append('g')
        .attr('transform', `translate(${degreeVs.radius*3+25},${(margin.top-height)/2})`);
      degreeVs.salaryTitle = g.append('text').attr('x', degreeVs.radius * 3 + 15).attr('y', -230).attr('font-size', '1.2em')
      g.append('text').attr('x', degreeVs.radius * 3 + 20).attr('y', 250).attr('font-size', '0.8em')
        .text('详细数据请查看该校专业设置数据')
      degree_draw('count1');
      degreeVs.centerLabel.text('本科学位');
      degreeVs.salaryTitle.text('本科毕业中位数年薪')
    },
    degree_master: function() {
      if (data.degrees.flags.flag2) {
        degree_draw('count2');
        degreeVs.centerLabel.text('硕士学位');
        degreeVs.salaryTitle.text('硕士毕业中位数年薪');
      } else {
        handleNext();
      }
    },
    degree_doctor: function() {
      if (data.degrees.flags.flag3) {
        degree_draw('count3');
        degreeVs.centerLabel.text('博士学位');
        degreeVs.salaryTitle.text('博士毕业中位数年薪');
      } else {
        handleNext();
      }
    },
    safty: function() {
      topLabel.text(data.cname + '校园安全一览')
      const margin = {
        top: 50,
        bottom: 0,
        left: 0,
        right: 0
      };
      const innerRadius = 70;
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const barHeight = (Math.min(innerWidth, innerHeight) - innerRadius) / 2;
      g = svg.append('g').attr('class', 'stageG')
        .attr('transform', `translate(${margin.left+innerWidth/2},${margin.top+innerHeight/2})`);
      const barScale = d3.scaleLog()
        .domain(d3.extent(data.crime.data, d => d.number))
        .range([innerRadius, barHeight])
        .nice();
      const keys = data.crime.data.map(d => d.type);
      const numBars = keys.length;
      const xScale = d3.scaleLog()
        .domain(d3.extent(data.crime.data, d => d.number))
        .range([-innerRadius, -barHeight])
        .nice();
      const xAxis = d3.axisRight(xScale)
        .ticks(2)
        .tickSize(0)
        .tickFormat(d => d);
      const xAxisG = g.append('g')
        .call(xAxis);
      xAxisG.select('.domain').remove();
      xAxisG.selectAll('text').attr('y', 6);
      const arc = d3.arc()
        .startAngle((d, i) => {
          return (i * 2 * Math.PI) / numBars;
        })
        .endAngle((d, i) => {
          return ((i + 1) * 2 * Math.PI) / numBars;
        })
        .padAngle(0.05)
        .innerRadius(innerRadius)
        .outerRadius(d => barScale(d.number));
      g.append('circle')
        .attr('r', innerRadius)
        .attr('class', 'outer')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', '1.5px');

      g.append('circle')
        .attr('r', barHeight)
        .attr('class', 'outer')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', '1.5px');

      const lines = g.selectAll('.segment-line')
        .data(keys).enter().append('line')
        .attr('class', 'segment-line')
        .attr('y1', -innerRadius)
        .attr('y2', -barHeight - 10)
        .attr('stroke', 'black')
        .attr('stroke-width', '.5px')
        .attr('transform', (d, i) => {
          return `rotate(${i*360/numBars})`;
        });

      var labelRadius = barHeight * 1.04;
      var labels = g.append("g")
        .classed("labels", true);

      labels.append("def")
        .append("path")
        .attr("id", "overview-crime-path")
        .attr("d", "m0 " + -labelRadius + " a" + labelRadius + " " + labelRadius + " 0 1,1 -0.01 0");
      labels.selectAll("text")
        .data(keys)
        .enter().append("text")
        .style("text-anchor", "middle")
        .attr('font-size', 14)
        .style("fill", function(d, i) {
          return "#3e3e3e";
        })
        .append("textPath")
        .attr("xlink:href", "#overview-crime-path")
        .attr("startOffset", function(d, i) {
          return i * 100 / numBars + 50 / numBars + '%';
        })
        .transition().delay((d, i) => i * 50)
        .text(d => transA[d]);

      const centerLabel = g.append('g')
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('cursor', 'pointer')
        .append('a')
        .attr('xlink:href', 'https://www.forwardpathway.com/39815')
      const centerLabel1 = centerLabel.append('tspan').attr('y', '-0.6em').attr('x', 0).text('20' + data.crime.year + '年每千人');
      const centerLabel2 = centerLabel.append('tspan').attr('y', '1em').attr('x', 0).text('犯罪率: ' + d3.format('.2f')(data.crime.avg1000));
      const circles = g.selectAll('.circle-mark')
        .data(xScale.ticks(2));
      circles.enter().append('circle')
        .attr('class', 'circle-mark')
        .attr('r', d => barScale(d))
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-dasharray', '2,2')
        .attr('stroke-width', '.5px')

      const segments = g.selectAll('.segments')
        .data(data.crime.data)
        .enter().append('path')
        .attr('class', 'segments')
        .attr('fill', 'steelblue')
        .transition().duration(1000).delay((d, i) => i * 50).ease(d3.easeElastic)
        .attrTween('d', function(d, index) {
          const i = d3.interpolate(1, d.number);
          return function(t) {
            d.number = i(t)
            return arc(d, index)
          }
        })
    },
    end: function() {
      const radius = 80;
      topLabel.text('');
      const gLast = svg.append('g').attr('class', 'gLast').attr('fill', 'white');
      gLast.append('rect').attr('x', 0).attr('y', 0)
        .attr('height', height)
        .attr('width', 0)
        .attr('fill', '#888')
        .attr('opacity', 0.8)
        .transition().duration(1000)
        .attr('width', width)
      const replayCircle = gLast.append('circle')
        .attr('cx', width / 2 - radius * 2.5)
        .attr('cy', height / 2)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 15)
        .attr('pointer-events', 'all')
        .attr('cursor', 'pointer')
        .on('click', function() {
          currentStage = -1;
          timeoutVal = setTimeout(handleNext, 100)
          gPause.attr('opacity', 1)
          gPlay.attr('opacity', 0)
        })
        .on('mouseover', function() {
          replayCircle.attr('fill', '#0996f2');
          replay.attr('fill', '#0996f2')
        })
        .on('mouseout', function() {
          replayCircle.attr('fill', 'none')
          replay.attr('fill', 'white')
        });
      const triangle = d3.symbol().type(d3.symbolTriangle).size(4000);
      gLast.append('path').attr('d', triangle)
        .attr('fill', 'white')
        .attr('transform', `translate(${width/2-radius*2.5},${height/2}) rotate(90)`)
        .attr('pointer-events', 'none')

      const replay = gLast.append('text').attr('font-size', '7em')
        .attr('text-anchor', 'middle')
        .text('再次播放')
        .attr('transform', `translate(${width/2+radius*1.2},${height/2+35})`)
        .attr('cursor', 'pointer')
        .on('click', function() {
          currentStage = -1;
          timeoutVal = setTimeout(handleNext, 100)
          gPause.attr('opacity', 1)
          gPlay.attr('opacity', 0)
        })
        .on('mouseover', function() {
          replayCircle.attr('fill', '#0996f2');
          replay.attr('fill', '#0996f2')
        })
        .on('mouseout', function() {
          replayCircle.attr('fill', 'none')
          replay.attr('fill', 'white')
        });
      gLast.append('text')
        .attr('font-size', '1.5em')
        .attr('text-anchor', 'middle')
        .text('*' + data.cname + '各项数据更详细信息可在各分项数据图表中单独查看')
        .attr('transform', `translate(${width/2},${height/2+200})`);
      gLast.append('text')
        .attr('font-size', '1em')
        .attr('transform', `translate(${width-300},${height-50})`)
        .selectAll('tspan')
        .data(data.brand)
        .enter().append('tspan')
        .text(d => d)
        .attr('y', -5)
        .transition().duration(3000).ease(d3.easeElastic.amplitude(20)).delay((d, i) => i * 50)
        .attr('y', 0)

    }
  }

  function updatePie(index, delay) {
    const arcEnter = compVs.arcData.enter().append("path")
      .attr('class', 'piePath' + index)
      .style('filter', 'url(#rect_drop-shadow)')
    arcEnter
      .attr("fill", d => compVs.colors(d.data.name))
      .transition().duration(1000).delay(delay)
      .attrTween("d", function(d) {
        var i = d3.interpolate(d.startAngle + 0.05, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return compVs.arc(d);
        }
      });
    const textCanvas = compVs.gg[index].append("g");
    const text = textCanvas.attr("font-size", '1.2em')
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(compVs.arcs)
      .join("text")
      .attr('class', 'pieText')
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.05).append("tspan")
        .attr('stroke', 'none')
        .attr('y', '0.2em')
        .attr('pointer-events', 'none')
        .text(d => transA[d.data.name]))
      .attr("transform", function(d) {
        const width = this.getBBox().width / 2;
        const height = this.getBBox().height / 2;
        const theta = (d.startAngle + d.endAngle) / 2;
        return `translate(${compVs.arcLabel.centroid(d)}) ` + `translate(${width*Math.sin(theta)},${-height*Math.cos(theta)})`;
      })
      .attr('opacity', 0)
      .transition(0).duration(500).delay(1000)
      .attr('opacity', 1)
  }

  function degree_draw(selectData) {
    let root = partiton(data.degrees, selectData);
    const salaryData = data.salary[selectData] ? data.salary[selectData] : [];
    root.each(d => d.current = d);
    degreeVs.labelCanvas.attr('display', 'none');
    const label = degreeVs.labelCanvas
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", d => +labelVisible(d.current))
      .attr("transform", d => labelTransform(d.current))
      .text(d => truncateString(d.data.name))
    const salary = degreeVs.salaryCanvas.selectAll('text')
      .data(salaryData, d => d.name)
      .join(
        enter => enter.append('text')
        .attr('dx', -50)
        .attr('dy', (d, i) => i * 60 + 150)
        .attr('opacity', 0)
        .text((d, i) => '#' + (i + 1) + '. ' + truncateString(d.name, 15))
        .call(enter => enter.append('tspan')
          .attr('x', -25)
          .attr('dy', 25)
          .text(d => d3.format('$,')(d.salary))
          .transition().duration(1000)
          .attr('x', 25)
        )
        .call(enter => enter.transition().duration(1000)
          .attr('dx', 0)
          .attr('opacity', 1)),
        update => update
        .call(update => update
          .text((d, i) => '#' + (i + 1) + '. ' + truncateString(d.name, 15))
          .append('tspan')
          .attr('x', 25)
          .attr('dy', 25)
          .text(d => d3.format('$,')(d.salary)))
        .call(
          update => update.transition().duration(1000)
          .attr('dy', (d, i) => i * 60 + 150)
        ),
        exit => exit.call(exit => exit
          .transition().duration(1000)
          .attr('dx', 100)
          .attr('opacity', 0).remove()
        )
        .call(exit => exit.select('tspan')
          .transition().duration(1000)
          .attr('x', 125)
        )
      )
    const path = g.selectAll('path')
      .data(root.descendants().slice(1))
      .join(
        enter => enter.append('path')
        .attr("fill", d => {
          while (d.depth > 1) d = d.parent;
          return degreeVs.color(d.data.name);
        }).each(function(d) {
          this._save = d.current;
        })
        .call(enter => enter.transition().duration(degreeVs.transitonDuration)
          .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
          .attrTween('d', function(d) {
            const i = d3.interpolate(d.current.x0, d.current.x1);
            return function(t) {
              d.current.x1 = i(t);
              return degreeVs.arc(d.current);
            }
          })
          .on('end', function() {
            degreeVs.labelCanvas.attr('display', null)
          })
        ),
        update => update.attr("fill", d => {
          while (d.depth > 1) d = d.parent;
          return degreeVs.color(d.data.name);
        })
        .call(
          update => update.filter(function(d) {
            return +this.getAttribute("fill-opacity") && !arcVisible(d.current);
          }).transition().duration(degreeVs.transitonDuration)
          .attrTween('d', function(d) {
            const i = d3.interpolate(this._save.x1, this._save.x0);
            return function(t) {
              this._save.x1 = i(t);
              return degreeVs.arc(this._save);
            }
          })
        ).call(
          update => update.transition().delay(degreeVs.transitonDuration)
          .duration(degreeVs.transitonDuration).attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
          .attrTween('d', function(d) {
            const i = d3.interpolate(this._save.x0, d.current.x0);
            const ii = d3.interpolate(this._save.x1, d.current.x1);
            const iii = d3.interpolate(this._save.y0, d.current.y0);
            const iiii = d3.interpolate(this._save.y1, d.current.y1);
            //var i=d3.interpolate(this._save,d.current);
            return function(t) {
              this._save.x0 = i(t);
              this._save.x1 = ii(t);
              this._save.y0 = iii(t);
              this._save.y1 = iiii(t);
              //this._save=i(t);
              return degreeVs.arc(this._save);
            }
          })
          .on('end', function() {
            degreeVs.labelCanvas.attr('display', null)
          })
        ),
        exit => exit.remove()
      );
  }

  function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 0 && d.x1 > d.x0;
  }

  function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 0 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.06;
  }

  function labelTransform(d) {
    let x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * degreeVs.radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }

  function truncateString(str, n) {
    const max = n ? n : degreeVs.maxStringLength;
    if (str.length <= max) {
      return str
    }
    return str.slice(0, max - 1) + '...'
  }

  function partiton(data, selectData) {
    const root = d3.hierarchy(data)
      .sum(d => d[selectData])
      .sort((a, b) => b[selectData] - a[selectData]);
    return d3.partition()
      .size([2 * Math.PI, root.height + 1])(root);
  }

  function showStage(index) {
    if (index < stages.length - 1) {
      stageLabel.text((index + 1) + '/' + (stages.length - 1));
    }
    if (stageClearG[index]) {
      if (stages[index] == 'international' && compVs.gg[3] && compVs.gg[3].selectAll('path').filter(d => d.data.name == 'nr')) {
        if (compVs.tempG) {
          compVs.tempG.remove()
        }
        compVs.tempG = svg.append('g').attr('transform', `translate(${width/2+160},${height/2})`)
        compVs.path = compVs.tempG
          .append(() => compVs.gg[3].selectAll('path').filter(d => d.data.name == 'nr').clone().node())
      }
      if (index == 0) {
        svg.select('.gLast').remove();
      }
      svg.select('.stageG')
        .attr('opacity', 1)
        .transition().duration(500)
        .attr('opacity', 0)
        .on('end', stageFuncs[stages[index]])
        .remove();
    } else {
      stageFuncs[stages[index]]();
    }
  }

  function zoomed(event) {
    const {
      transform
    } = event;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
    g.select('.schoolLocation1')
      .attr('r', 8 / transform.k)
    g.select('.schoolLocation2')
      .attr('r', 12 / transform.k)
      .attr('stroke-width', 2 / transform.k)
  }
}
overviewWrap()
}
catch( err ) { console.log( err ); }
try {
const majorCanvasWidth = document.getElementById('major_canvas').clientWidth;
d3.select('#major_canvas')
.style('height',(majorCanvasWidth<600?(majorCanvasWidth+30):majorCanvasWidth*(430)/750)+'px');
major_create = function() {
d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/degree_all_20240821.php?name='+ location.pathname.substring(1) + location.search.replace("?", "&")).then(data => {
const width = document.getElementById('major_canvas').clientWidth < 600 ? 430 : 750,
    height = 400,
    format = d3.format(",d")
  const treemap = (data, selected) => d3.treemap()
    .tile(tile)
    (d3.hierarchy(data)
      .sum(d => d[selected])
      .sort((a, b) => b[selected] - a[selected]))
  const color = d3.scaleOrdinal(d3.schemeTableau10)
  const color2 = d3.scaleOrdinal()
    .domain(['White', 'Asian', 'Latino', 'Pacific and others', 'African', 'International'])
    .range(['#f1e2c8', '#cfb5a0', '#955b45', '#714341', '#3b2d34', '#77bd98']);
  const color_mw = d3.scaleOrdinal()
    .domain(['Men', 'Women'])
    .range(['#589dcd', '#f78085']);
  const levelArray = {
    'all': 'count',
    'associate': 'count0',
    'under': 'count1',
    'master': 'count2',
    'doctor': 'count3'
  }
  const levelNameArray = {
    'all': '',
    'associate': '副学士',
    'under': '本科',
    'master': '硕士',
    'doctor': '博士'
  }
  const name = d => d.ancestors().reverse().map(d => d.data.name).join("/")
  const x = d3.scaleLinear().rangeRound([0, width]);
  const y = d3.scaleLinear().rangeRound([0, height]);
  const svg = d3.select('#major_canvas').append('svg')
    .attr('viewBox', [0.5, -25.5, width, height + 25])
  const g = svg.append('g')
  const g_tooltip = svg.append('g')
    .attr('display', 'none')
    .attr('pointer-events', 'none')
  const tooltipRect = g_tooltip.append('rect')
    .attr('rx', 8)
    .attr('stroke', 'white').attr('stroke-width', 2)
  const tooltipText = g_tooltip.append('text')
    .attr('fill', 'white')
    .attr('font-size', '0.8em')
  let group = g.append("g")
  d3.selectAll('#major_switchButton input').on('click', function() {
    x.domain([0, 1]);
    y.domain([0, 1]);
    render(group, treemap(data, levelArray[d3.select(this).attr('class')]), d3.select('#major_displayType label.active input').attr('class'))
  })
  d3.selectAll('#major_displayType input').on('click', function() {
    if (d3.select(this).attr('class') == 'allMajors') {
      d3.select('#major_displayType_text').text('*只显示专业层级数据')
    } else {
      d3.select('#major_displayType_text').text('*点击任意区块可渐进显示下一层级数据')
    }
    x.domain([0, 1]);
    y.domain([0, 1]);
    render(group, treemap(data, levelArray[d3.select('#major_switchButton label.active input').attr('class')]), d3.select(this).attr('class'))
  })
  if (!data.flags.flag0) {
    d3.select('#major_switchButton label.associateLabel').remove()
  }
  if (!data.flags.flag1) {
    d3.select('#major_switchButton label.underLabel').remove()
  }
  if (!data.flags.flag2) {
    d3.select('#major_switchButton label.masterLabel').remove()
  }
  if (!data.flags.flag3) {
    d3.select('#major_switchButton label.doctorLabel').remove()
  }

  render(group, treemap(data, 'count'), 'clickMajors')

  function render(group, root, type) {
    let displayData = [];
    if (type == 'allMajors') {
      root.each(d => d.depth == 2 ? displayData.push(d) : null)
      displayData.push(root)
    } else {
      displayData = root.children.concat(root);
    }
    const node = group
      .selectAll("g")
      .data(displayData, d => d.data.name + d.depth)
      .join(
        function(enter) {
          enter = enter.append('g')
            .attr("transform", d => d === root ? `translate(0,-25)` : `translate(${x(d.x0)},${y(d.y0)})`)
          if (type == 'clickMajors') {
            enter.filter(d => d === root ? d.parent : d.children)
              .attr("cursor", "pointer")
              .on("click", (event, d) => d === root ? zoomout(root) : zoomin(d))
          }
          enter.append("rect")
            .attr("fill", function(d) {
              if (d === root) {
                return '#f0f0f0';
              } else if (d.depth == 3) {
                return color2(d.data.name)
              } else if (d.depth == 4) {
                return color_mw(d.data.name)
              } else {
                while (d.depth > 1) {
                  d = d.parent
                }
                return color(d.data.name);
              }
            })
            .attr("stroke", "#fff")
            .attr("width", d => d === root ? width : x(d.x1) - x(d.x0))
            .attr("height", d => d === root ? 25 : y(d.y1) - y(d.y0))
            .filter(d => d !== root)
            .on('mouseover', function(event, d) {
              d3.select(this).attr("fill", function(d) {
                if (d.depth == 3) {
                  return d3.color(color2(d.data.name)).darker(0.3)
                } else if (d.depth == 4) {
                  return d3.color(color_mw(d.data.name)).darker(0.3)
                } else {
                  while (d.depth > 1) {
                    d = d.parent
                  }
                  return d3.color(color(d.data.name)).darker(0.3);
                }
              })
              mouseover();
              mousemove(event, d);
            })
            .on('mouseout', function(event, d) {
              d3.select(this).attr("fill", function(d) {
                if (d.depth == 3) {
                  return color2(d.data.name)
                } else if (d.depth == 4) {
                  return color_mw(d.data.name)
                } else {
                  while (d.depth > 1) {
                    d = d.parent
                  }
                  return color(d.data.name)
                }
              })
              mouseout();
            })
            .on('mousemove', mousemove)

          enter.filter(d => d.depth === 1)
            .append('image')
            .attr('class', 'classLogo')
            .attr('xlink:href', d => 'https://www.forwardpathway.com/wp-content/uploads/logos/hotlink-ok/degreelogo/' + d.data.name + '-min.png')
            .attr('width', d => logoSize(d, root).size)
            .attr('height', d => logoSize(d, root).size)
            .attr('transform', d => `translate(${logoSize(d,root).xOffset},${logoSize(d,root).yOffset})`)
            .attr('pointer-events', 'none')
            .attr('opacity', 0.1)
          enter.filter(d => d === root || d.depth > 1)
            .append('text').attr('class', 'className')
            .attr('pointer-events', 'none')
            .attr('font-size', d => d.depth == 2 && type == 'allMajors' ? '0.6em' : '0.8em')
            .attr('text-anchor', d => d === root ? null : 'middle')
            .attr('fill', d => d === root ? '#000' : '#fff')
            .attr('x', d => (d === root ? 10 : x(d.x1) - x(d.x0)) / 2)
            .attr('y', d => (d === root ? 35 : y(d.y1) - y(d.y0)) / 2)
            .text(d => d === root ? d.data.name + data.year + '年毕业生分布' : labelText(d, type))

          enter.filter(d => d.depth > 1)
            .append('text').attr('class', 'classValue')
            .attr('pointer-events', 'none')
            .attr('font-size', d => d.depth == 2 && type == 'allMajors' ? '0.6em' : '0.8em')
            .attr('text-anchor', 'middle')
            .attr('fill', '#fff')
            .attr('x', d => (d === root ? 10 : x(d.x1) - x(d.x0)) / 2)
            .attr('y', d => (d === root ? 35 : y(d.y1) - y(d.y0)) / 2 + 15)
            .text(d => d === root || (x(d.x1) - x(d.x0)) < 20 || (y(d.y1) - y(d.y0)) < 30 ? null : d.value + '人')
          return enter;
        },
        function(update) {
          update.transition().duration(500)
            .attr("transform", d => d === root ? `translate(0,-25)` : `translate(${x(d.x0)},${y(d.y0)})`)
          update.select("rect")
            .attr("fill", function(d) {
              if (d == root) {
                return '#f0f0f0';
              } else if (d.depth == 3) {
                return color2(d.data.name)
              } else if (d.depth == 4) {
                return color_mw(d.data.name)
              } else {
                while (d.depth > 1) {
                  d = d.parent
                }
                return color(d.data.name);
              }
            })
            .transition().duration(500)
            .attr("width", d => d === root ? width : x(d.x1) - x(d.x0))
            .attr("height", d => d === root ? 25 : y(d.y1) - y(d.y0));
          update.select('.classLogo')
            .transition().duration(500)
            .attr('width', d => logoSize(d, root).size)
            .attr('height', d => logoSize(d, root).size)
            .attr('transform', d => `translate(${logoSize(d,root).xOffset},${logoSize(d,root).yOffset})`)
          update.select('.className')
            .attr('text-anchor', d => d === root ? null : 'middle')
            .attr('font-size', d => d.depth == 2 && type == 'allMajors' ? '0.6em' : '0.8em')
            .text(d => d === root ? d.data.name + data.year + '年毕业生分布' : labelText(d, type))
            .attr('fill', d => d === root ? '#000' : '#fff')
            .transition().duration(500)
            .attr('x', d => (d === root ? 10 : x(d.x1) - x(d.x0)) / 2)
            .attr('y', d => (d === root ? 35 : y(d.y1) - y(d.y0)) / 2)
          update.select('.classValue')
            .text(d => d === root || (x(d.x1) - x(d.x0)) < 20 || (y(d.y1) - y(d.y0)) < 30 ? null : d.value + '人')
            .attr('font-size', d => d.depth == 2 && type == 'allMajors' ? '0.6em' : '0.8em')
            .transition().duration(500)
            .attr('x', d => (d === root ? 10 : x(d.x1) - x(d.x0)) / 2)
            .attr('y', d => (d === root ? 35 : y(d.y1) - y(d.y0)) / 2 + 15)

          return update;
        },
        remove => remove.remove()
      );
  }

  function labelText(d, type) {
    const nodeWidth = x(d.x1) - x(d.x0),
      nodeHeight = y(d.y1) - y(d.y0),
      k = (type == 'allMajors' ? 12 : 20)
    const maxLength = Math.floor(nodeWidth / k)
    if (nodeHeight > 20 && maxLength > 0) {
      return d.data.name.length > maxLength ? (d.data.name.slice(0, maxLength) + '...') : d.data.name
    } else {
      return null;
    }

  }

  function tile(node, x0, y0, x1, y1) {
    d3.treemapBinary(node, 0, 0, width, height);
    for (const child of node.children) {
      child.x0 = x0 + child.x0 / width * (x1 - x0);
      child.x1 = x0 + child.x1 / width * (x1 - x0);
      child.y0 = y0 + child.y0 / height * (y1 - y0);
      child.y1 = y0 + child.y1 / height * (y1 - y0);
    }
  }

  function position(group, root) {
    group.selectAll("g")
      .attr("transform", d => d === root ? `translate(0,-25)` : `translate(${x(d.x0)},${y(d.y0)})`)
      .select("rect")
      .attr("width", d => d === root ? width : x(d.x1) - x(d.x0))
      .attr("height", d => d === root ? 25 : y(d.y1) - y(d.y0));
    group.selectAll('.classLogo')
      .attr('width', d => logoSize(d, root).size)
      .attr('height', d => logoSize(d, root).size)
      .attr('transform', d => `translate(${logoSize(d,root).xOffset},${logoSize(d,root).yOffset})`)
    group.selectAll('.className')
      .attr('x', d => (d === root ? 10 : x(d.x1) - x(d.x0)) / 2)
      .attr('y', d => (d === root ? 35 : y(d.y1) - y(d.y0)) / 2)
      .text(function(d) {
        if (d.depth === 0) {
          return d.data.name + data.year + '年毕业生分布'
        } else {
          return d === root ? d.ancestors().reverse().map(d => d.data.name).join("≫") : labelText(d, null)
        }
      })
    group.selectAll('.classValue')
      .attr('x', d => (d === root ? 10 : x(d.x1) - x(d.x0)) / 2)
      .attr('y', d => (d === root ? 35 : y(d.y1) - y(d.y0)) / 2 + 15)
      .text(d => d === root || (x(d.x1) - x(d.x0)) < 20 || (y(d.y1) - y(d.y0)) < 30 ? null : d.value + '人')
  }

  function logoSize(d, root) {
    let size, xOffset, yOffset;
    if (d === root) {
      size = Math.min(x(d.x1) - x(d.x0), y(d.y1) - y(d.y0)) * 0.9;
      xOffset = (x(d.x1) + x(d.x0) - size) / 2;
      yOffset = (y(d.y1) + y(d.y0) - size) / 2 + 25;
    } else {
      size = Math.min(x(d.x1) - x(d.x0), y(d.y1) - y(d.y0)) * 0.9;
      xOffset = (x(d.x1) - x(d.x0) - size) / 2;
      yOffset = (y(d.y1) - y(d.y0) - size) / 2;
    }
    return {
      size: size,
      xOffset: xOffset,
      yOffset: yOffset
    };
  }

  function zoomin(d) {
    g_tooltip.attr('display', 'none')
    const group0 = group.attr("pointer-events", "none");
    const group1 = group = g.append("g").call(render, d, 'clickMajors');
    x.domain([d.x0, d.x1]);
    y.domain([d.y0, d.y1]);
    g.transition()
      .duration(500)
      .call(t => group0.transition(t)
        .call(position, d.parent).remove())
      .call(t => group1.transition(t)
        .attrTween("opacity", () => d3.interpolate(0, 1))
        .call(position, d));
    group1.append('text').attr('text-anchor', 'end')
      .attr('font-size', '0.8em')
      .attr('x', width - 10)
      .attr('y', -7)
      .attr('pointer-events', 'none')
      .text('点击返回上一层')
  }

  function zoomout(d) {
    const group0 = group.attr("pointer-events", "none");
    const group1 = group = g.insert("g", 'g').call(render, d.parent, 'clickMajors');
    x.domain([d.parent.x0, d.parent.x1]);
    y.domain([d.parent.y0, d.parent.y1]);
    g.transition()
      .duration(500)
      .call(t => group0.transition(t)
        .attrTween("opacity", () => d3.interpolate(1, 0))
        .call(position, d).remove())
      .call(t => group1.transition(t)
        .call(position, d.parent));
    if (d.depth > 1) {
      group1.append('text').attr('text-anchor', 'end')
        .attr('font-size', '0.8em')
        .attr('x', width - 10)
        .attr('y', -7)
        .attr('pointer-events', 'none')
        .text('点击返回上一层')
    }
  }

  function mouseover() {
    g_tooltip.attr('display', null)
  }

  function mouseout() {
    g_tooltip.attr('display', 'none')
  }

  function mousemove(event, d) {
    const levelName = levelNameArray[d3.selectAll('#major_switchButton label.active input').attr('class')]
    const mouse = d3.pointer(event, svg.node())
    let selectedData, selectedLevel, tooltipX, tooltipY
    if (d.depth == 1) {
      tooltipText.text(data.name)
        .append('tspan').attr('x', 0).attr('dy', '1.3em').attr('font-weight', 'bold')
        .text(d.data.name)
        .append('tspan').attr('x', 0).attr('dy', '1.3em')
        .text(d.data.ename)
        .append('tspan').attr('x', 0).attr('dy', '1.3em').attr('font-weight', 'normal')
        .text(data.year + '年共毕业' + levelName + d.value + '人（' + d3.format('.2%')(d.value / d.parent.value) + '）')
        .append('tspan').attr('x', 0).attr('dy', '1.3em')
        .text('点击查看下属专业毕业生详情')
    } else if (d.depth == 2) {
      const type = d3.select('#major_displayType label.active input').attr('class')
      tooltipText.text(d.parent.data.name)
        .append('tspan').attr('x', 0).attr('dy', '1.3em').attr('font-weight', 'bold')
        .text(d.data.name + '专业')
        .append('tspan').attr('x', 0).attr('dy', '1.3em')
        .text(d.data.ename)
        .append('tspan').attr('x', 0).attr('dy', '1.3em').attr('font-weight', 'normal')
        .text(data.year + '年共毕业' + levelName + d.value + '人（' + d3.format('.2%')(d.value / (type == 'clickMajors' ? d.parent.value : d.parent.parent.value)) + '）')
      if (type == 'clickMajors') {
        tooltipText.append('tspan').attr('x', 0).attr('dy', '1.3em')
          .text('点击查看该专业毕业生详情')
      }
    } else if (d.depth == 3) {
      tooltipText.text(d.parent.data.name + '专业')
        .append('tspan').attr('x', 0).attr('dy', '1.3em').attr('font-weight', 'bold')
        .text(d.data.name)
        .append('tspan').attr('x', 0).attr('dy', '1.3em')
        .text(d.data.ename)
        .append('tspan').attr('x', 0).attr('dy', '1.3em').attr('font-weight', 'normal')
        .text(data.year + '年共毕业' + levelName + d.value + '人（' + d3.format('.2%')(d.value / d.parent.value) + '）')
        .append('tspan').attr('x', 0).attr('dy', '1.3em')
        .text('点击查看男女生比例')
    } else if (d.depth == 4) {
      tooltipText.text(d.parent.parent.data.name + '专业')
        .append('tspan').attr('x', 0).attr('dy', '1.3em')
        .text(d.parent.data.name)
        .append('tspan').attr('x', 0).attr('dy', '1.3em').attr('font-weight', 'bold')
        .text(d.data.name + ' (' + d.data.ename + ')')
        .append('tspan').attr('x', 0).attr('dy', '1.3em').attr('font-weight', 'normal')
        .text(data.year + '年共毕业' + levelName + d.value + '人（' + d3.format('.2%')(d.value / d.parent.value) + '）')
    }
    const tooltipBox = tooltipText.node().getBBox();
    tooltipRect.attr('x', tooltipBox.x - 10)
      .attr('y', tooltipBox.y - 5)
      .attr('width', tooltipBox.width + 20)
      .attr('height', tooltipBox.height + 10)
      .attr("fill", function(dd = d) {
        if (dd.depth == 3) {
          return d3.color(color2(dd.data.name)).darker()
        } else if (dd.depth == 4) {
          return d3.color(color_mw(dd.data.name)).darker()
        } else {
          while (dd.depth > 1) {
            dd = dd.parent
          }
          return d3.color(color(dd.data.name)).darker();
        }
      })
    if (mouse[0] + tooltipBox.width + 20 > width) {
      tooltipX = mouse[0] - tooltipBox.width - 20
    } else {
      tooltipX = mouse[0] + 25
    }
    if (mouse[1] + tooltipBox.height + 20 > height) {
      tooltipY = mouse[1] - tooltipBox.height + 20
    } else {
      tooltipY = mouse[1] + 30
    }
    g_tooltip.attr('transform', `translate(${tooltipX},${tooltipY})`)
  }
});
};
jQuery(document).on('scroll load touchmove', major_create2), jQuery(window).on("load", major_create2);

function major_create2() {
  const $ = jQuery;
  const o = $("#major_canvas").offset().top,
    r = $("#major_canvas").outerHeight() / 8,
    i = $(window).height(),
    s = $(window).scrollTop();
  if (s > o + r - i) {
    major_create();
    $(document).off('scroll load touchmove', major_create2), $(window).off("load", major_create2);
  }
}
}
catch( err ) { console.log( err ); }
try {
const ranking_admin_canvas_width = document.getElementById('ranking_admin_canvas').clientWidth;
const ranking_admin_responsive_flag = ranking_admin_canvas_width < 500;
d3.select('#ranking_admin_canvas')
  .style('height', (ranking_admin_responsive_flag ? (ranking_admin_canvas_width * 0.8) : (ranking_admin_canvas_width * 4 / 9)) + 'px');
rank_admin_create=function() {
let promises = [d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/ranking_admin_20250923.php?name='+ location.pathname.substring(1) + location.search.replace("?", "&")), d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/events_international_students.php')]
Promise.all(promises).then(([data, us_events]) => {
  let ranking_admin_active = 1;
  jQuery("#adm_switchButton :input").change(function() {
    if ($(this).attr('class') === 'adm_rate_button') {
      ranking_admin_active = 1;
      updateChart(1);
    } else {
      ranking_admin_active = 2;
      updateChart(2);
    }
  });
  data.forEach(d => {
    d.year = parseInt(d.year);
    d.rate = +d.rate;
    d.rate2 = +d.rate2;
  });

  const width = ranking_admin_responsive_flag ? 500 : 900;
  const height = 400;
  const margin = {
    top: 10,
    right: ranking_admin_responsive_flag ? 25 : 65,
    bottom: 60,
    left: ranking_admin_responsive_flag ? 25 : 70
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  const svg = d3.select('#ranking_admin_canvas')
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);
  svg.append('rect').attr('height', '100%').attr('width', '100%')
    .attr('fill', 'url(#watermark)').attr('opacity', 0.03)
  const circleRadius = 4;
  const rectWidth = 10;
  const colors = d3.scaleOrdinal()
    .domain(['blue', 'green', 'red', 'yellow', 'deny', 'defer', 'enroll'])
    .range(["#589dcd", "#fcb02a", "#f78085", '#f7e02c', '#ffc1c1', '#6eacd6', '#57ce98']);
  const xValue = d => d.year;
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]); //align last tick to number

  const yValue = d => d.rate;
  const yValue2 = d => d.rate2;
  const yValue3 = d => d.rank;
  //const yValue4 = d => d.qs_rank;

  const y_domain_map = data.map(yValue).concat(data.map(yValue2));
  const y_rank_domain_map = data.map(yValue3);
  const yScale = d3.scaleLinear()
    .domain(d3.extent(y_domain_map)).nice()
    .range([innerHeight, 0]);
  const yScale_rank = d3.scaleLinear()
    .domain([d3.min(y_rank_domain_map) - 1, d3.max(y_rank_domain_map) + 1])
    .range([0, innerHeight]).nice();

  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  const plotG = g.append('g')
  const xAxisFormat = d => d + '年';
  const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(20)
    .tickFormat(xAxisFormat)
    .ticks(data.length);
  const xAxisG = g.append('g');
  xAxisG.call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);
  xAxisG.selectAll('text')
    .attr('transform', 'rotate(-45)')
    .attr('x', -25);
  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .ticks(6)
    .tickPadding(ranking_admin_responsive_flag ? -45 : 10)
    .tickFormat(d3.format('~%'));
  const yAxisG = g.append('g').attr('class', 'adm_rate');
  yAxisG.call(yAxis);
  const yAxisLabelText = yAxisG
    .append('text')
    .attr('class', 'axis-label')
    .attr('y', ranking_admin_responsive_flag ? -10 : -50)
    .attr('x', -innerHeight / 2)
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('录取率');

  const yAxis2 = d3.axisRight(yScale_rank)
    .tickSize(0)
    .ticks(5)
    .tickPadding(ranking_admin_responsive_flag ? -20 : 10);

  const yAxisG2 = g.append('g');
  yAxisG2.attr('transform', `translate(${innerWidth},0)`)
    .call(yAxis2);
  const yAxisLabelText2 = yAxisG2
    .append('text')
    .attr('class', 'axis-label')
    .attr('y', ranking_admin_responsive_flag ? -10 : -45)
    .attr('x', innerHeight / 2)
    .attr('fill', 'black')
    .attr('transform', 'rotate(90)')
    .attr('text-anchor', 'middle')
    .text('排名');

  const lineGenerator = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveMonotoneX);
  const line = plotG.append('path')
    .attr('stroke-width', 4)
    .attr('fill', 'none')
    .attr('stroke', colors('blue'))
    .attr('d', lineGenerator(data.filter(d => d.rate > 0)))
    .attr('opacity', 1)
  const circles = plotG.selectAll('.men-adm-rate-circle')
    .data(data.filter(d => d.rate > 0))
    .enter()
    .append('circle')
    .attr('class', 'men-adm-rate-circle')
    .attr('stroke', colors('blue'))
    .attr('fill', 'white')
    .attr('r', circleRadius)
    .attr('cy', d => yScale(yValue(d)))
    .attr('cx', d => xScale(xValue(d)))
    .attr('opacity', 1)
  if (data.filter(d => d.rate > 0).length > 0) {
    const legendDiv = d3.select('#ranking_admin_legend').append('div')
      .attr('class', 'adm_rate')
      .style('display', 'inline-block')
    const legendSvg = legendDiv.append('svg')
      .attr('width', 40)
      .attr('height', 20)
    legendSvg.append('path')
      .attr('d', 'M2 10 H38').attr('stroke-width', 3)
      .attr('stroke', colors('blue'));
    legendSvg.append('circle')
      .attr('stroke', colors('blue'))
      .attr('fill', 'white')
      .attr('r', 4)
      .attr('cx', 20)
      .attr('cy', 10)
    legendDiv.append('span').html('男生录取率');
  }

  const lineGenerator2 = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue2(d)))
    .curve(d3.curveMonotoneX);
  const line2 = plotG.append('path')
    .attr('stroke-width', 4)
    .attr('fill', 'none')
    .attr('stroke', colors('red'))
    .attr('d', lineGenerator2(data.filter(d => d.rate2 > 0)))
    .attr('opacity', 1)
  const circles2 = plotG.selectAll('.women-adm-rate-circle')
    .data(data.filter(d => d.rate2 > 0))
    .enter()
    .append('circle')
    .attr('class', 'women-adm-rate-circle')
    .attr('stroke', colors('red'))
    .attr('fill', 'white')
    .attr('r', circleRadius)
    .attr('cy', d => yScale(yValue2(d)))
    .attr('cx', d => xScale(xValue(d)))
    .attr('opacity', 1)
  if (data.filter(d => d.rate2 > 0).length > 0) {
    const legendDiv2 = d3.select('#ranking_admin_legend').append('div')
      .attr('class', 'adm_rate')
      .style('display', 'inline-block')
    const legendSvg2 = legendDiv2.append('svg')
      .attr('width', 40)
      .attr('height', 20)
    legendSvg2.append('path')
      .attr('d', 'M2 10 H38').attr('stroke-width', 3)
      .attr('stroke', colors('red'));
    legendSvg2.append('circle')
      .attr('stroke', colors('red'))
      .attr('fill', 'white')
      .attr('r', 4)
      .attr('cx', 20)
      .attr('cy', 10)
    legendDiv2.append('span').html('女生录取率');
  }
  /////////////////////////////////

  const series = d3.stack().keys(['deny', 'defer', 'enroll'])(data.filter(d => d.enroll));
  yScale
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).nice()
  const area = d3.area()
    .x(d => xScale(d.data.year))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]))

  const areas = plotG.append("g")
    .selectAll("path")
    .data(series)
    .join("path")
    .attr("fill", ({
      key
    }) => colors(key))
    .attr("d", area)
    .attr('opacity', 0)
  areas.append("title")
    .text(({
      key
    }) => key);
  if (data.filter(d => d.enroll > 0).length > 0) {
    const legendDiv_n1 = d3.select('#ranking_admin_legend').append('div')
      .attr('class', 'adm_number')
      .style('display', 'inline-block')
    const legendSvg_n1 = legendDiv_n1.append('svg')
      .attr('width', 40)
      .attr('height', 20)
    legendSvg_n1.append('path')
      .attr('d', 'M2 10 H38').attr('stroke-width', 6)
      .attr('stroke', colors('deny'));
    legendDiv_n1.append('span').html('被拒人数');

    const legendDiv_n2 = d3.select('#ranking_admin_legend').append('div')
      .attr('class', 'adm_number')
      .style('display', 'inline-block')
    const legendSvg_n2 = legendDiv_n2.append('svg')
      .attr('width', 40)
      .attr('height', 20)
    legendSvg_n2.append('path')
      .attr('d', 'M2 10 H38').attr('stroke-width', 6)
      .attr('stroke', colors('defer'));
    legendDiv_n2.append('span').html('未入学');

    const legendDiv_n3 = d3.select('#ranking_admin_legend').append('div')
      .attr('class', 'adm_number')
      .style('display', 'inline-block')
    const legendSvg_n3 = legendDiv_n3.append('svg')
      .attr('width', 40)
      .attr('height', 20)
    legendSvg_n3.append('path')
      .attr('d', 'M2 10 H38').attr('stroke-width', 6)
      .attr('stroke', colors('enroll'));
    legendDiv_n3.append('span').html('实际入学');

  }
  //////////////////////////////////////////////////////

  const lineGenerator3 = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale_rank(yValue3(d)))
    .curve(d3.curveStep);
  const line3 = plotG.append('path')
    .attr('class', 'line-move-animation')
    .attr('stroke-width', 4)
    .attr('fill', 'none')
    .attr('stroke', colors('yellow'))
    .attr('d', lineGenerator3(data.filter(d => d.rank)));
  plotG.append('g')
    .attr('class', 'rectGroup')
    .selectAll('.rect3')
    .data(data.filter(d => d.rank != null))
    .enter()
    .append('rect')
    .attr('class', 'rect3')
    .attr('stroke', colors('yellow'))
    .attr('fill', colors('yellow'))
    .attr('width', rectWidth)
    .attr('height', rectWidth)
    .attr('y', d => yScale_rank(yValue3(d)) - rectWidth / 2)
    .attr('x', d => xScale(xValue(d)) - rectWidth / 2);
  if (data.filter(d => d.rank != null).length > 0) {
    const legendDiv3 = d3.select('#ranking_admin_legend').append('div')
      .style('display', 'inline-block')
    const legendSvg3 = legendDiv3.append('svg')
      .attr('width', 40)
      .attr('height', 20)
    legendSvg3.append('path')
      .attr('d', 'M2 10 H38').attr('stroke-width', 3)
      .attr('stroke', colors('yellow'));
    legendSvg3.append('rect')
      .attr('stroke', colors('yellow'))
      .attr('fill', colors('yellow'))
      .attr('width', 8)
      .attr('height', 8)
      .attr('x', 20 - 4)
      .attr('y', 10 - 4);
    legendDiv3.append('span').html('USNews排名');
  }
/*
  const lineGenerator4 = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale_rank(yValue4(d)))
    .curve(d3.curveStep);
  const line4 = plotG.append('path')
    .attr('stroke-width', '4')
    .attr('fill', 'none')
    .attr('stroke', colors('green'))
    .attr('d', lineGenerator4(data.filter(d => d.qs_rank)));
  plotG.selectAll('.rect4')
    .data(data.filter(d => d.qs_rank))
    .enter()
    .append('rect')
    .attr('class', 'rect4')
    .attr('stroke', colors('green'))
    .attr('fill', colors('green'))
    .attr('width', rectWidth)
    .attr('height', rectWidth)
    .attr('y', d => yScale_rank(yValue4(d)) - rectWidth / 2)
    .attr('x', d => xScale(xValue(d)) - rectWidth / 2);
  if (data.filter(d => d.qs_rank != null).length > 0) {


    const legendDiv4 = d3.select('#ranking_admin_legend').append('div')
      .style('display', 'inline-block')
    const legendSvg4 = legendDiv4.append('svg')
      .attr('width', 40)
      .attr('height', 20)
    legendSvg4.append('path')
      .attr('d', 'M2 10 H38').attr('stroke-width', 3)
      .attr('stroke', colors('green'));
    legendSvg4.append('rect')
      .attr('stroke', colors('green'))
      .attr('fill', colors('green'))
      .attr('width', 8)
      .attr('height', 8)
      .attr('x', 20 - 4)
      .attr('y', 10 - 4);
    legendDiv4.append('span').html('QS美国大学排名');
  }*/
  ////////////////////////tooltip/////////////////////////////////////////
  let tooltipCanvas = g.append('g');

  let mouseLine = tooltipCanvas.append('g')
    .append('path')
    .attr('stroke', '#303030')
    .attr('stroke-width', 1)
    .attr('opacity', 0);

  let tooltip = tooltipCanvas.append('g')
    .attr('display', 'none');
  let focus = g.append('rect')
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    .on('mousemove', focusMouseMove)
    .on('mouseover', focusMouseOver)
    .on('mouseout', focusMouseOut);

  let tooltipBackground = tooltip.append('rect')
    .attr('fill', '#e8e8e8')
    .attr('rx', 15)
    .attr('stroke', 'white')
    .attr('stroke-width', 2);
  let tooltipText = tooltip.append('text')
    .attr('x', 5)
    .attr('y', 5)
    .attr('dy', '13px')

  /////////////////Covid/////////////////////////////
  const covidIconW = 30;
  const iconCanvas = g.append('g')
  let eventIcons = [];
  us_events.forEach((event_element, index) => {
    if (event_element.year >= xScale.domain()[0] && event_element.year <= xScale.domain()[1]) {
      if (event_element.link != null) {
        eventIcons[index] = iconCanvas.append('a')
          .attr('xlink:href', 'https://www.forwardpathway.com/' + event_element.link)
          .append('image')
          .attr('xlink:href', 'https://www.forwardpathway.com/wp-content/uploads/logos/hotlink-ok/axisIcon/' + event_element.icon)
          .attr('width', covidIconW)
          .attr('x', xScale(event_element.year + event_element.month / 12) - covidIconW / 2)
          .attr('y', innerHeight - covidIconW / 2)
          .attr('name', event_element.name)
          .on('mousemove', focusMouseMove)
          .on('mouseover', focusMouseOver)
          .on('mouseout', focusMouseOut);
      } else {
        eventIcons[index] = iconCanvas
          .append('image')
          .attr('xlink:href', 'https://www.forwardpathway.com/wp-content/uploads/logos/hotlink-ok/axisIcon/' + event_element.icon)
          .attr('width', covidIconW)
          .attr('x', xScale(event_element.year + event_element.month / 12) - covidIconW / 2)
          .attr('y', innerHeight - covidIconW / 2)
          .attr('name', event_element.name)
          .on('mousemove', focusMouseMove)
          .on('mouseover', focusMouseOver)
          .on('mouseout', focusMouseOut);
      }
    }
  })
  //////////////////////////////////////////////////

  function focusMouseMove(event) {
    tooltip.attr('display', null);
    let mouse = d3.pointer(event);
    let dateOnMouse = xScale.invert(mouse[0]);
    const closestDate = Math.round(dateOnMouse);
    const nearestDateXcord = xScale(closestDate)
    mouseLine.attr('d', `M ${nearestDateXcord} 0 V ${innerHeight}`).attr('opacity', 1);
    if (this.tagName == 'rect') {
      tooltipText.text(xAxisFormat(closestDate));
      let selectedData = data.filter(d => d.year == closestDate)[0]
      if (selectedData.rank) {
        tooltipText.append('tspan')
          .attr('class', 'tooltip-text-line')
          .attr('x', 5)
          .attr('dy', '1.5em')
          .text('USNews排名：' + selectedData.rank)
      }
      if (selectedData.qs_rank) {
        tooltipText.append('tspan')
          .attr('class', 'tooltip-text-line')
          .attr('x', 5)
          .attr('dy', '1.5em')
          .text('QS美国大学排名：' + selectedData.qs_rank)
      }
      if (ranking_admin_active == 1) {
        if (selectedData.rate) {
          tooltipText.append('tspan')
            .attr('class', 'tooltip-text-line')
            .attr('x', 5)
            .attr('dy', '1.5em')
            .text('男生录取率：' + d3.format('.2%')(selectedData.rate))
        }
        if (selectedData.rate2) {
          tooltipText.append('tspan')
            .attr('class', 'tooltip-text-line')
            .attr('x', 5)
            .attr('dy', '1.5em')
            .text('女生录取率：' + d3.format('.2%')(selectedData.rate2))
        }
      } else {
        if (selectedData.deny || selectedData.enroll) {
          const apply = d3.format(',')(selectedData.deny + selectedData.defer + selectedData.enroll) + '人';
          const deny = d3.format(',')(selectedData.deny) + '人';
          const enroll = d3.format(',')(selectedData.enroll) + '人';
          tooltipText.append('tspan')
            .attr('class', 'tooltip-text-line ')
            .attr('x', 5)
            .attr('dy', '1.5em')
            .text(`申请：${apply}, 被拒：${deny}`)
            .append('tspan')
            .attr('x', 5)
            .attr('dy', '1.5em')
            .text(`实际入学：${enroll}`);
        }
      }
    } else {
      let event_element = us_events.find(d => d.name == d3.select(this).attr('name'))
      tooltipText
      .text(event_element.year+'年'+(event_element.month>0?(event_element.month+'月'):''))
      .append('tspan')
        .attr('class', 'tooltip-text-line')
        .attr('x', 5)
        .attr('dy', '1.5em')
        .text(event_element.title)
        .append('tspan')
        .attr('x', 5)
        .attr('dy', '1.5em')
        .text(event_element.des)
    }

    const tooltipBox = tooltipText.node().getBBox();
    tooltipBackground
      .attr('x', tooltipBox.x - 10)
      .attr('y', tooltipBox.y - 5)
      .attr("width", tooltipBox.width + 20)
      .attr("height", tooltipBox.height + 10);
    let tooltipX, tooltipY;
    if ((nearestDateXcord + tooltipBox.width) > innerWidth) {
      tooltipX = innerWidth - tooltipBox.width - 10;
    } else {
      tooltipX = nearestDateXcord + 10;
    }
    if (tooltipBox.height + mouse[1] > innerHeight - 30) {
      tooltipY = innerHeight - tooltipBox.height - 30
    } else {
      tooltipY = mouse[1] + 5
    }
    tooltip.attr("transform", `translate(${tooltipX},${tooltipY})`);

  }

  function focusMouseOver() {
    mouseLine.attr("opacity", "1");
    tooltip.attr("display", null);
  }

  function focusMouseOut() {
    mouseLine.attr("opacity", "0");
    tooltip.attr("display", "none");
  }

  function updateChart(option) {
    if (option == 1) {
      yScale
        .domain(d3.extent(y_domain_map)).nice()
      yAxis
        .tickFormat(d3.format('~%'));
      yAxisG.call(yAxis);
      yAxisLabelText
        .text('录取率');
      line.transition().duration(500).delay(100).attr('opacity', 1)
      line2.transition().duration(500).delay(100).attr('opacity', 1)
      circles.transition().duration(500).delay(100).attr('opacity', 1)
      circles2.transition().duration(500).delay(100).attr('opacity', 1)
      areas.transition().attr('opacity', 0)
      d3.selectAll('#ranking_admin_legend .adm_rate').style('display', 'inline-block');
      d3.selectAll('#ranking_admin_legend .adm_number').style('display', 'none');
    } else {
      yScale
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).nice()
      yAxis
        .tickFormat(d3.format('~s'));
      yAxisG.call(yAxis);
      yAxisLabelText
        .text('申请、录取人数');
      line.transition().attr('opacity', 0)
      line2.transition().attr('opacity', 0)
      circles.transition().attr('opacity', 0)
      circles2.transition().attr('opacity', 0)
      areas.transition().duration(500).delay(100).attr('opacity', 1)
      d3.selectAll('#ranking_admin_legend .adm_rate').style('display', 'none');
      d3.selectAll('#ranking_admin_legend .adm_number').style('display', 'inline-block');
    }
  }
  updateChart(1)
})
}
jQuery(document).on('scroll load touchmove', rank_admin_create2), jQuery(window).on("load", rank_admin_create2);

function rank_admin_create2() {
  const $ = jQuery;
  const o = $("#ranking_admin_canvas").offset().top,
    r = $("#ranking_admin_canvas").outerHeight() / 8,
    i = $(window).height(),
    s = $(window).scrollTop();
  if (s > o + r - i) {
    rank_admin_create();
    $(document).off('scroll load touchmove', rank_admin_create2), $(window).off("load", rank_admin_create2);
  }
}
}
catch( err ) { console.log( err ); }
try {
const score_required_canvas_width = document.getElementById('score_required_canvas').clientWidth;
const score_required_responsive_flag = score_required_canvas_width < 500;
d3.select('#score_required_canvas')
  .style('height', (score_required_responsive_flag ? (score_required_canvas_width * 0.8) : (score_required_canvas_width * 4 / 9)) + 'px');

score_required_create = function() {
  d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/score10_20231213.php?name='+ location.pathname.substring(1) + location.search.replace("?", "&")).then(data => {
    const convertArray = {
      'SATR': 'SAT阅读',
      'SATM': 'SAT数学',
      'ACTC': 'ACT综合',
      'ACTE': 'ACT英语',
      'ACTM': 'ACT数学'
    };
    for (const year in data) {
      data[year]['score'].forEach(function(d) {
        d.name = convertArray[d.name];
      })
    }
    let width = document.getElementById('score_required_canvas').clientWidth;
    const height = 400;
    let responsiveFlag = width < 500;
    width = responsiveFlag ? 500 : 900;

    const margin = {
      top: 10,
      bottom: 80,
      left: 80,
      left2: 10,
      right: 20,
    };
    const sliderPadding = 80;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    d3.select("#score_require_note").append('p')
      .attr('style', 'text-align:right;margin:0 40px;font-size:0.8em')
      .text("*左侧数字为录取学生中SAT/ACT成绩提交比例，蓝色区块代表录取学生25%-75%成绩要求")
    d3.select("#score_require_note").append('p')
      .attr('style', 'text-align:right;margin:0 40px;font-size:0.8em')
      .text("***拖动绿色年份块可查看不同年份数据，点击蓝色区块可查看成绩要求变化趋势")
    const svg = d3.select("#score_required_canvas").append('svg')
      .attr("viewBox", [0, 0, width, height])

    const slider = d3.sliderBottom();

    const xValueStart = d => d.start;
    const xValueEnd = d => d.end;
    const xScale = d3.scaleLinear().domain([0, 1]).range([margin.left, width - margin.right]);

    const yValue = d => d.name;
    const yScale = d3.scaleBand().range([margin.top, height - margin.bottom])
      .padding(0.08);
    const yAxisG = svg.append('g').attr('class', 'score_yAxis')
      .attr('transform', `translate(${margin.left},0)`);
    svg.append('rect').attr('height', '100%').attr('width', '100%')
      .attr('fill', 'url(#watermark)').attr('opacity', 0.03)
    svg.append('path').attr('d', `M${margin.left},${margin.top} L${margin.left},${height-margin.bottom}`)
      .attr('stroke', 'black')
    const times = Object.keys(data);
    slider
      .min(d3.min(times))
      .max(d3.max(times))
      .step(1)
      //.marks(times)
      .default(times[times.length - 1])
      .width(width - sliderPadding * 2)
      .ticks(width / 100)
      .tickFormat(d3.format(""))
      //.tickValues(times)
      .on("onchange", (val) => {
        draw(data[val]);
      });
    const sliderG = svg.append('g')
      .attr('transform', `translate(${sliderPadding},${height-margin.bottom+20})`)
      .call(slider);

    draw(data[times[times.length - 1]]);

    function draw(data) {
      const dataS = data.score.filter(d => d.start != null)
      const dataP = data.per
      yScale.domain(dataS.map(yValue));

      const yAxis = d3.axisLeft(yScale)
        .tickSizeOuter(0)
        .tickSize(-width + margin.left + margin.right);
      yAxisG.transition().duration(500).call(yAxis);
      yAxisG.selectAll('.tick').select('line')
        .transition().duration(500)
        .attr('stroke-width', yScale.bandwidth() / 2)
        .attr('stroke', '#aaa');
      yAxisG.select('.domain').remove();
      yAxisG.selectAll('.tick text').attr('dx', 15)
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'start')

      const score_required = svg
        .selectAll('.score_required')
        .data(dataS)
        .join(
          enter => enter.append('rect')
          .attr('class', 'score_required')
          .attr('rx', 10)
          .attr('fill', '#589dcd')
          .style('cursor', 'pointer')
          .attr('x', function(d) {
            if (d.start > 36) {
              return xScale(d.start / 800);
            } else {
              return xScale(d.start / 36);
            }
          })
          .attr('y', d => yScale(d.name))
          .attr('height', yScale.bandwidth())
          .attr('width', 0)
          .on('click', clicked),
          update => update,
          exit => exit.remove()
        )
        .transition().duration(500)
        .attr('x', function(d) {
          if (d.start > 36) {
            return xScale(d.start / 800);
          } else {
            return xScale(d.start / 36);
          }
        })
        .attr('y', d => yScale(d.name))
        .attr('height', yScale.bandwidth())
        .attr('width', function(d) {
          if (d.end > 36) {
            return xScale(d.end / 800) - xScale(d.start / 800);
          } else {
            return xScale(d.end / 36) - xScale(d.start / 36);
          }
        })


      const score_labels = svg.selectAll('.score-labels')
        .data(dataS)
        .join(
          enter => enter.append('text')
          .attr('class', 'score-labels')
          .attr('font-size', '12px')
          .attr('fill', 'white')
          .attr('pointer-events', 'none')
          .attr('text-anchor', function(d) {
            const scoreT = d.end > 36 ? 800 : 36;
            if ((d.end - d.start) / scoreT <= 0.04 && d.end / scoreT >= 0.96) {
              return 'end'
            } else {
              return 'middle'
            }
          })
          .attr('dx', function(d) {
            const scoreT = d.end > 36 ? 800 : 36;
            if ((d.end - d.start) / scoreT <= 0.04 && d.end / scoreT >= 0.96) {
              return (xScale(d.end / scoreT) - xScale(d.start / scoreT)) / 2
            } else {
              return 0
            }
          })
          .attr('x', function(d) {
            if (d.end > 36) {
              return (xScale(d.start / 800) + xScale(d.end / 800)) / 2;
            } else {
              return (xScale(d.start / 36) + xScale(d.end / 36)) / 2;
            }
          })
          .attr('y', d => yScale(d.name) + yScale.step() / 2),
          update => update,
          exit => exit.remove()
        )
        .transition().duration(500)
        .text(d => d.start + '-' + d.end)
        .attr('text-anchor', function(d) {
          const scoreT = d.end > 36 ? 800 : 36;
          if ((d.end - d.start) / scoreT <= 0.04 && d.end / scoreT >= 0.96) {
            return 'end'
          } else {
            return 'middle'
          }
        })
        .attr('dx', function(d) {
          const scoreT = d.end > 36 ? 800 : 36;
          if ((d.end - d.start) / scoreT <= 0.04 && d.end / scoreT >= 0.96) {
            return (xScale(d.end / scoreT) - xScale(d.start / scoreT)) / 2
          } else {
            return 0
          }
        })
        .attr('x', function(d) {
          if (d.end > 36) {
            return (xScale(d.start / 800) + xScale(d.end / 800)) / 2;
          } else {
            return (xScale(d.start / 36) + xScale(d.end / 36)) / 2;
          }
        })
        .attr('y', d => yScale(d.name) + yScale.step() / 2)

      const score_per = svg.selectAll('.score_per_bra')
        .data(dataP)
        .join('path')
        .attr('class', 'score_per_bra')
        .attr('fill', 'none')
        .attr('stroke', '#d0d0d0')
        .attr('d', function(d) {
          const ys = yScale.domain().filter(dd => dd.indexOf(d.name) > -1)
          let ysArray = [];
          ys.forEach(dd => ysArray = ysArray.concat(yScale(dd)))
          return ys.length <= 1 ? null : `M ${margin.left} ${d3.min(ysArray)+yScale.bandwidth()/4} h -${(margin.left-margin.left2)/2+5} v ${(d3.max(ysArray)-d3.min(ysArray)+yScale.bandwidth()/2-margin.left+margin.left2)/2-3} M ${margin.left} ${d3.max(ysArray)+3*yScale.bandwidth()/4} h -${(margin.left-margin.left2)/2+5} v -${(d3.max(ysArray)-d3.min(ysArray)+yScale.bandwidth()/2-margin.left+margin.left2)/2-3}`
        })

      const pie = d3.pie()
        .sort(null)
        .value(d => d.per)
      const arc = d3.arc()
        .innerRadius((margin.left - margin.left2) / 2 - 10)
        .outerRadius((margin.left - margin.left2) / 2)
      const score_pie_g = svg.selectAll('.score_pie')
        .data(dataP)
        .join('g')
        .attr('class', 'score_pie')
        .attr('text-anchor', 'middle')
        .attr('pointer-events', 'bounding-box')
        .attr('transform', function(d) {
          const ys = yScale.domain().filter(dd => dd.indexOf(d.name) > -1)
          let ysArray = [];
          ys.forEach(dd => ysArray = ysArray.concat(yScale(dd)))
          return `translate(${(margin.left+margin.left2)/2-5},${(d3.min(ysArray)+d3.max(ysArray)+yScale.bandwidth())/2})`
        })
      score_pie_g.selectAll('title')
        .data(d => [d])
        .join('title')
        .text(d => '录取学生中' + d.name + '成绩提交比例为' + d.per + '%')
      score_pie_g.selectAll('path')
        .data(function(d) {
          let ds = []
          ds.push({
            name: d.name,
            per: +d.per
          })
          ds.push({
            name: d.name + '2',
            per: (100 - d.per)
          })
          return pie(ds);
        })
        .join('path')
        .attr('fill', (d, i) => i == 0 ? '#589dcd' : '#d0d0d0')
        .attr('d', arc)
      score_pie_g.selectAll('text')
        .data(d => [d])
        .join('text')
        .attr('dominant-baseline', 'middle')
        .text(d => d.per + '%')
        .attr('class', 'test')
    }

    function clicked(event, dd) {
      let data2 = [];
      for (const year in data) {
        const start = data[year].score.filter(d => d.name == dd.name)[0].start
        const end = data[year].score.filter(d => d.name == dd.name)[0].end
        if (start > 0 && end > 0) {
          data2.push({
            'year': year,
            'start': start,
            'end': end
          })
        }
      }
      const margin2 = {
        left: 30,
        right: 15,
        top: 30,
        bottom: 30
      }
      const g2 = svg.append('g').attr('class', 'score_trends')
      g2.append('rect').attr('x', 3)
        .attr('y', margin.top / 2)
        .attr('width', width - margin.left2 / 2 - margin.right / 2)
        .attr('height', 0)
        .attr('opacity', 0.5)
        .on('click', trends_close)
        .transition().duration(500)
        .attr('height', height - margin.top / 2)

      g2.append('rect')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('width', 0)
        .attr('height', 0)
        .transition().duration(500).delay(500)
        .attr('x', width / 6)
        .attr('y', height / 6)
        .attr('width', width * 2 / 3)
        .attr('height', height * 2 / 3)
        .attr('fill', 'white')
      const g3 = g2.append('g').attr('display', 'none')
      setTimeout(function() {
        g3.attr('display', null)
      }, 1000)
      const x = d3.scaleLinear()
        .domain(d3.extent(data2, d => d.year))
        .range([width / 6 + margin2.left, width * 5 / 6 - margin2.right])
      const y = d3.scaleLinear()
        .domain([d3.min(data2, d => d.start) * 0.9, d3.max(data2, d => d.end) * 1.1])
        .range([height * 5 / 6 - margin2.bottom, height / 6 + margin2.top])
      const xAxis = g3.append('g').call(
          d3.axisBottom(x).ticks(d3.min([6, data2.length - 1])).tickFormat(d3.format('')).tickSize(-height * 2 / 3 + margin2.top + margin2.bottom)
        )
        .attr('transform', `translate(${0},${height*5/6-margin2.bottom})`)
      const yAxis = g3.append('g').call(d3.axisLeft(y).ticks(6).tickSize(-width * 2 / 3 + margin2.left + margin2.right))
        .attr('transform', `translate(${width/6+margin2.left},${0})`)
      g3.selectAll('.domain').remove()
      const area = d3.area()
        .curve(d3.curveMonotoneX)
        .x(d => x(d.year))
        .y0(d => y(d.start))
        .y1(d => y(d.end))(data2)
      g3.append('g')
        .append('path')
        .attr('d', area)
        .attr('fill', 'steelblue')
        .attr('opacity', 0.8)
      g3.append('text')
        .attr('transform', `translate(${width/6+margin2.left},${height/6+margin.top+15})`)
        .text(dd.name)
      g3.append('text')
        .attr('transform', `translate(${width*5/6-margin2.right-20},${height/6+margin.top+20})`)
        .text('X')
        .attr('font-size', 20)
        .attr('cursor', 'pointer')
        .on('click', trends_close)
    }

    function trends_close() {
      svg.select('.score_trends').remove();
    }
  })
}
jQuery(document).on('scroll load touchmove', score_required_create2), jQuery(window).on("load", score_required_create2);

function score_required_create2() {
  const $ = jQuery;
  const o = $("#score_required_canvas").offset().top,
    r = $("#score_required_canvas").outerHeight() / 8,
    i = $(window).height(),
    s = $(window).scrollTop();
  if (s > o + r - i) {
    score_required_create();
    $(document).off('scroll load touchmove', score_required_create2), $(window).off("load", score_required_create2);
  }
}
}
catch( err ) { console.log( err ); }
try {
const student_comp_canvas_width=document.getElementById('student_comp_canvas').clientWidth;
d3.select('#student_comp_canvas').style('height',student_comp_canvas_width*4/9+'px');

student_comp_create=function() {
const width = 900;
const height = 400;
const transitionDuration = 500;
const radius = height/2-25;
const radius2 = height /3-25;
const marginX = 80;
const marginY = height / 2 - radius;
const pie_sep = width / 2;
var student_comp_tooltip = d3.select('#student_comp_canvas')
  .append('div').attr('class', 'studentCompTooltip');

const svg = d3.select('#student_comp_canvas').append('svg')
  .attr('viewBox', [-radius - marginX, -radius - marginY, width, height]);
svg.append('rect').attr('height', '100%').attr('width', '100%')
  .attr('transform',`translate(${-radius - marginX},${-radius - marginY})`)
    .attr('fill', 'url(#watermark)').attr('opacity', 0.03)
const g = svg.append("g");
const g2 = svg.append("g")
  .attr('transform', `translate(${pie_sep},0)`);
const line1 = svg.append('line').attr('stroke', '#b6b6b6').attr('stroke-dasharray', '2 2'),
  line2 = svg.append('line').attr('stroke', '#b6b6b6').attr('stroke-dasharray', '2 2');
const pie = d3.pie()
  .sort(null)
  .value(d => d.value);
d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/student_comp_20240118.php?name='+ location.pathname.substring(1) + location.search.replace("?", "&")).then(data => {
  const converArray = {
    'uf': '本科新生',
    'uj': '本科老生',
    'ut': '本科转学生',
    'gr': '研究生',
    'nd': '无学位',
    'wh': '白人',
    'as': '亚裔',
    'la': '拉丁裔',
    'pa': '太平洋岛民及其他',
    'af': '非裔',
    'nr': '留学生'
  };
  const total = d3.sum(data, function(d) {
    return d.value;
  })
  data.forEach(function(d) {
    d.name = converArray[d.name];
    d.percentage = Math.round(d.value / total * 10000) / 100;
    const total2 = d3.sum(d.subs, function(dd) {
      return dd.value;
    })
    d.subs.forEach(function(dd) {
      dd.top=d.name;
      dd.name = converArray[dd.name];
      dd.percentage = Math.round(dd.value / total2 * 10000) / 100;
    })
  })
  svg.append('text')
  .attr('text-anchor','middle')
  .attr('font-size','2em')
  .attr('dominant-baseline','middle')
  .text(data[0].year+'年')
  const arc = d3.arc()
    .innerRadius(radius / 2)
    .outerRadius(radius - 1)
  const selected_offset = 10
  const arc_selected = d3.arc()
    .innerRadius(radius / 2 + selected_offset)
    .outerRadius(radius - 1 + selected_offset)
    .padAngle(0.01)

  const arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);
  const arcs = pie(data);

  g.attr("stroke", "white")
    .selectAll(".path")
    .data(arcs)
    .join("path")
    .attr('class', 'path')
    .attr("fill", d => d.data.color)
    .attr("d", arc)
    .on('click', clicked)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', function() {
      student_comp_tooltip.style('display', 'none');
    });

  const text = g.append("g")
    .attr("font-size", '1.2em')
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text");

  text.attr("transform", d => `translate(${arcLabel.centroid(d)})`)
    .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.05).append("tspan")
      .attr('stroke', 'none')
      .attr('y', '0.2em')
      .attr('pointer-events', 'none')
      .text(d => d.data.name));

  function clicked(event, d) {
    g.selectAll('.path').filter(dd => dd.data.name != d.data.name)
      .attr('d', arc)
    g.selectAll('.path').filter(dd => dd.data.name == d.data.name)
      .attr('d', arc_selected)
    var rotate = 90 - ((d.startAngle + d.endAngle) / 2 * 180) / Math.PI;
    g.transition().duration(transitionDuration)
      .attr('transform', `rotate(${rotate})`);
    text.filter(dd => dd.data.name != d.data.name)
      .transition().duration(transitionDuration)
      .attr('transform', function(dd) {
        const width = this.getBBox().width / 2;
        const height = this.getBBox().height / 2;
        const theta = (dd.startAngle + dd.endAngle) / 2;
        return `translate(${arcLabel.centroid(dd)[0]},${arcLabel.centroid(dd)[1]})` + ` rotate(${-rotate})` + ` translate(${width*Math.sin(theta+rotate*Math.PI/180)},${-height*Math.cos(theta+rotate*Math.PI/180)})`;
      });
    text.filter(dd => dd.data.name == d.data.name)
      .transition().duration(transitionDuration)
      .attr('transform', function(dd) {
        const width = this.getBBox().width / 2;
        const height = this.getBBox().height / 2;
        const theta = (dd.startAngle + dd.endAngle) / 2;
        return `translate(${arcLabel.centroid(dd)[0]},${arcLabel.centroid(dd)[1]})` + ` rotate(${-rotate})` + ` translate(${width*Math.sin(theta+rotate*Math.PI/180)},${-height*Math.cos(theta+rotate*Math.PI/180)})` + ` translate(${selected_offset},0)`;
      });
    let startAng = d.startAngle + rotate * Math.PI / 180;
    let endAng = d.endAngle + rotate * Math.PI / 180;
    if (Math.abs(startAng - endAng) > Math.PI * 0.999) {
      startAng = 0;
      endAng = Math.PI;
    }
    line2.transition().duration(transitionDuration)
      .attr('x1', (radius + selected_offset) * Math.sin(startAng + 0.005))
      .attr('y1', (radius + selected_offset) * Math.cos(startAng + 0.005));
    line1.transition().duration(transitionDuration)
      .attr('x1', (radius + selected_offset) * Math.sin(endAng - 0.005))
      .attr('y1', (radius + selected_offset) * Math.cos(endAng - 0.005));
    draw_second_pie(d.data.subs);
  }
  clicked(null, arcs[0]);
  draw_second_pie(data[0].subs);
  line1.attr('x1', radius * Math.sin(arcs[0].startAngle))
    .attr('y1', -radius * Math.cos(arcs[0].startAngle))
    .attr('x2', pie_sep)
    .attr('y2', -radius2);

  line2.attr('x1', radius * Math.sin(arcs[0].endAngle))
    .attr('y1', -radius * Math.cos(arcs[0].endAngle))
    .attr('x2', pie_sep)
    .attr('y2', radius2);
  //.attr('transform',`translate()`);
})

function draw_second_pie(data2) {
  const arc2 = d3.arc()
    .innerRadius(0)
    .outerRadius(radius2 - 1)
  const arcs2 = pie(data2);


  const pieChart2 = g2.attr("stroke", "white")
    .selectAll(".path2")
    .data(arcs2);
  pieChart2
    .enter().append('path')
    .attr('class', 'path2')
    .attr("fill", d => d.data.color)
    .attr("d", arc2)
    .each(function(d) {
      this._current = d;
    })
    .merge(pieChart2)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', function() {
      student_comp_tooltip.style('display', 'none');
    })
    .transition().duration(transitionDuration)
    .attrTween("d", arcTween);

  function arcTween(a) {
    let i = d3.interpolate(this._current, a);
    this._current = a;
    return function(t) {
      return arc2(i(t));
    };
  }
}

function mouseover(event, d) {
  student_comp_tooltip.style('display', 'block')
    .style('background-color', d.data.color)
    .html((d.data.top?d.data.top+"中：<br>":"")+d.data.name + d.data.value + "人，占比" + d.data.percentage + "%<br>其中男生" + d.data.ratioM + "%，女生" + d.data.ratioW + "%");
  if (d.data.name == '白人') {
    student_comp_tooltip.style('color', 'black')
  } else {
    student_comp_tooltip.style('color', 'white')
  }
}

function mousemove(event, d) {
  let tooltipX = width / 2;
  if (event.layerX > width / 2) {
    tooltipX = event.layerX - student_comp_tooltip.node().clientWidth - 10;
  } else {
    tooltipX = event.layerX + 10;
  }
  student_comp_tooltip.style('top', (event.layerY + 10) + 'px')
    .style('left', tooltipX + 'px');
}
}
jQuery(document).on('scroll load touchmove', student_comp_create2), jQuery(window).on("load", student_comp_create2);

function student_comp_create2() {
  const $ = jQuery;
  const o = $("#student_comp_canvas").offset().top,
    r = $("#student_comp_canvas").outerHeight() / 8,
    i = $(window).height(),
    s = $(window).scrollTop();
  if (s > o + r - i) {
    student_comp_create();
    $(document).off('scroll load touchmove', student_comp_create2), $(window).off("load", student_comp_create2);
  }
}
}
catch( err ) { console.log( err ); }
try {
const age_canvas_width=document.getElementById('age_canvas').clientWidth;
const age_responsive_flag=age_canvas_width<500;
d3.select('#age_canvas').style('height',(age_responsive_flag?(age_canvas_width*6/9):(age_canvas_width*4/9))+'px');
student_comp_age_create=function() {
  d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/age_mf_20240118.php?name='+ location.pathname.substring(1) + location.search.replace("?", "&")).then(data => {
  d3.selectAll('#age-switchButton input').on('click', function() {
    age_draw(d3.select(this).attr('class'));
  })
  let width = document.getElementById('age_canvas').clientWidth;
  let responsiveFlag = width < 500;
  width = responsiveFlag ? 600 : 900;
  const height = 400;
  const margin = {
    top: 20,
    bottom: 40,
    left: responsiveFlag ? 20 : 80,
    right: responsiveFlag ? 20 : 40
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#age_canvas").append('svg')
    .attr("viewBox", [0, 0, width, height]);
  svg.append('rect').attr('height', '100%').attr('width', '100%')
    .attr('fill', 'url(#watermark)').attr('opacity', 0.03)
  const g = svg.append('g');
  const xScale = d3.scaleLinear().range([margin.left, width - margin.right]);

  const yValue = d => d.cat;
  const yScale = d3.scaleBand().range([margin.top, height - margin.bottom])
    .padding(0.3);
  const yAxisG = svg.append('g').attr('class', 'age_yAxis')
    .attr('transform', `translate(${margin.left},0)`);
  const xAxisG = svg.append('g').attr('class', 'age_xAxis')
    .attr('transform', `translate(0,${height-margin.bottom})`)
  const tooltipInd = svg.append('rect').attr('fill', 'lightgray').attr('opacity', 0.5).attr('display', 'none')
  let focus = svg.append('rect').attr('class', 'temp')
    .attr('transform', `translate(${margin.left},${margin.top})`)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    .on('mousemove', focusMouseMove)
    .on('mouseover', focusMouseOver)
    .on('mouseout', focusMouseOut)
  const tooltipG = svg.append('g').attr('display', 'none').attr('pointer-events', 'none');

  const tooltipRect = tooltipG.append('rect').attr('fill', 'lightgray')
  .attr('stroke','white').attr('stroke-width',2).attr('rx',5)
  const tooltipText = tooltipG.append('text')

  if (!data.filter(d => d.underm > 0 || d.underf < 0).length > 0) {
    d3.select('#age-switchButton label.totalButtonLabel').remove();
    d3.select('#age-switchButton label.underButtonLabel').remove();
    d3.select('#age-switchButton label.gradButtonLabel').attr('class', 'btn btn-secondary gradButtonLabel active');
    age_draw('grad');
  } else if (!data.filter(d => d.gradm > 0 || d.gradf < 0).length > 0) {
    d3.select('#age-switchButton label.totalButtonLabel').remove();
    d3.select('#age-switchButton label.gradButtonLabel').remove();
    d3.select('#age-switchButton label.underButtonLabel').attr('class', 'btn btn-secondary underButtonLabel active');
    age_draw('under');
  } else {
    age_draw('total');
  }

  function focusMouseMove(event) {
    const mouse = d3.pointer(event);
    let catIndex = Math.round((mouse[1] - yScale.step() * (0.5 + yScale.padding() / 2)) / yScale.step());
    if (catIndex < 0) {
      catIndex = 0;
    }
    if (catIndex > data.length - 1) {
      catIndex = data.length - 1;
    }
    tooltipInd.attr('x', margin.left)
      .attr('y', margin.top + (catIndex + yScale.padding() / 2) * yScale.step())
      .attr('width', innerWidth)
      .attr('height', yScale.step())
    const focusedData = data[catIndex];
    const m_selected = $('#age-switchButton .active input').attr('class') + 'm';
    const f_selected = $('#age-switchButton .active input').attr('class') + 'f';
    tooltipText.text($('#age-switchButton .active').text())
      .append('tspan')
      .attr('x', 0).attr('dy', '1.2em')
      .text('年龄段：' + focusedData.cat)
      .append('tspan')
      .attr('x', 0).attr('dy', '1.2em')
      .text('男生：' + focusedData[m_selected] + '人，女生：' + (-focusedData[f_selected]) + '人')
    const tooltipBox = tooltipText.node().getBBox();
    tooltipRect
      .attr('x', tooltipBox.x - 10)
      .attr('y', tooltipBox.y - 5)
      .attr("width", tooltipBox.width + 20).attr("height", tooltipBox.height + 10);
    let offsetX, offsetY;
    if (tooltipBox.width + mouse[0] >= innerWidth) {
      offsetX = mouse[0] - tooltipBox.width - 20 + margin.left;
    } else {
      offsetX = mouse[0] + margin.left + 20
    }
    if (tooltipBox.height + mouse[1] >= innerHeight) {
      offsetY = mouse[1] - tooltipBox.height + margin.top;
    } else {
      offsetY = mouse[1] + margin.top + 20
    }
    tooltipG.attr('transform', `translate(${offsetX},${offsetY})`);
  }

  function focusMouseOver() {
    tooltipG.attr('display', null);
    tooltipInd.attr('display', null);
  }

  function focusMouseOut() {
    tooltipG.attr('display', 'none');
    tooltipInd.attr('display', 'none');
  }

  function age_draw(xSelected) {
    const xValueM = d => d[xSelected + 'm'];
    const xValueF = d => d[xSelected + 'f'];

    xScale.domain(d3.extent([].concat(data.map(xValueM)).concat(data.map(xValueF)))).nice();
    yScale.domain(data.map(yValue));
    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth);
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight).tickFormat(Math.abs).ticks(width / 100);
    yAxisG.call(yAxis);
    xAxisG.transition().duration(1000).call(xAxis);
    yAxisG.select('.domain').remove();
    xAxisG.select('.domain').remove();
    yAxisG.selectAll('.tick line').attr('transform', `translate(0,${yScale.step()/2})`)
    if (responsiveFlag) {
      yAxisG.selectAll('.tick text').attr('dx', '60px')
    }
    const ageM = g
      .selectAll('.ageM')
      .data(data);
    ageM.enter()
      .append('rect')
      .attr('class', 'ageM')
      .attr('fill', '#589dcd')
      .attr('x', xScale(0))
      .attr('y', d => yScale(yValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('width', d => xScale(xValueM(d)) - xScale(0))
      .merge(ageM).transition().duration(1000)
      .attr('x', xScale(0))
      .attr('y', d => yScale(yValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('width', d => xScale(xValueM(d)) - xScale(0));

    const ageF = g
      .selectAll('.ageF')
      .data(data);
    ageF.enter()
      .append('rect')
      .attr('class', 'ageF')
      .attr('fill', '#ff8e64')
      .attr('x', d => xScale(xValueF(d)))
      .attr('y', d => yScale(yValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('width', d => xScale(0) - xScale(xValueF(d)))
      .merge(ageF).transition().duration(1000)
      .attr('x', d => xScale(xValueF(d)))
      .attr('y', d => yScale(yValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('width', d => xScale(0) - xScale(xValueF(d)));
  }
})
}
jQuery(document).on('scroll load touchmove', student_comp_age_create2), jQuery(window).on("load", student_comp_age_create2);

function student_comp_age_create2() {
  const $ = jQuery;
  const o = $("#age_canvas").offset().top,
    r = $("#age_canvas").outerHeight() / 8,
    i = $(window).height(),
    s = $(window).scrollTop();
  if (s > o + r - i) {
    student_comp_age_create();
    $(document).off('scroll load touchmove', student_comp_age_create2), $(window).off("load", student_comp_age_create2);
  }
}
}
catch( err ) { console.log( err ); }
try {
const international_canvas_width=document.getElementById('international_canvas').clientWidth;
const international_responsive_flag=international_canvas_width<500;
d3.select('#international_canvas').style('height',(international_responsive_flag?international_canvas_width*6/9:international_canvas_width*4/9)+'px');
international_create=function() {
  let promises = [d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/international_students_20240118.php?name='+ location.pathname.substring(1) + location.search.replace("?", "&")), d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/events_international_students.php')]
Promise.all(promises).then(([data, us_events]) => {
  jQuery("#international_switchButton :input").change(function() {
    if (jQuery(this).attr('class') === 'under') {
      render('under', 'underper');
    } else {
      render('grad', 'gradper');
    }
  });
  let groupValuesByX = [];
  data.forEach(d => {
    d.year = parseInt(d.year);
    groupValuesByX[d.year] = [];
    Object.entries(d).forEach(entry => {
      const [key, value] = entry;
      if (key != 'year') {
        d[key] = +value;
        groupValuesByX[d.year].push(value);
      }
    })
  });
  const width = international_responsive_flag ? 600 : 900;
  const height = 400;
  const margin = {
    top: 10,
    right: international_responsive_flag ? 25 : 80,
    bottom: 85,
    left: international_responsive_flag ? 25 : 75
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select('#international_canvas')
    .append("svg")
    .attr("viewBox", [0, 0, width, height]).style('overflow', 'visible')
  svg.append('rect').attr('height', '100%').attr('width', '100%')
    .attr('fill', 'url(#watermark)').attr('opacity', 0.03)
  const circleRadius = 6;
  const rectWidth = 8;
  const legendWidth = 150;
  const colors = d3.scaleOrdinal()
    .domain(['under', 'underper', 'grad', 'gradper'])
    .range(["#589dcd", "#589dcd", "#05cbae", '#05cbae']);
  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  const chartCavas = g.append('g')
    .attr('class', 'internationalChartCanvas')
  const xScale = d3.scaleBand()
    .range([0, innerWidth]);
  const xAxisG = g.append('g').attr('class', 'xAxis')
    .attr('transform', `translate(0,${innerHeight})`);

  const yScale = d3.scaleLinear()
    .range([innerHeight, 0]).nice();
  const yAxisG = g.append('g').attr('class', 'yAxis');
  const yScale2 = d3.scaleLinear()
    .range([innerHeight, 0]).nice();
  const yAxisG2 = g.append('g').attr('class', 'yAxis2').attr('transform', `translate(${innerWidth},0)`);
  const yAxisLabelText2 = g
    .append('text')
    .attr('class', 'axis-label')
    .attr('y', international_responsive_flag ? -10 : -55)
    .attr('x', innerHeight / 2)
    .attr('fill', 'black')
    .attr('transform', `translate(${innerWidth},0)` + ' rotate(90)')
    .attr('text-anchor', 'middle')
    .text('留学生比例');


  const lineGroup = chartCavas.append('path').attr('class', 'line').attr('opacity', 0.6);

  const legendCanvas = g.append('g')
    .attr('class', 'legendCanvas');
  const legendGroup = legendCanvas.append('g')
    .attr('transform', `translate(1,0)`);
  const legend1 = legendGroup.append('rect');
  const legend1Text = legendGroup.append('text')
  const yAxisLabelText = g
    .append('text')
    .attr('class', 'axis-label')
    .attr('y', international_responsive_flag ? -10 : -55)
    .attr('x', -innerHeight / 2)
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('学生人数');
  const legendGroup2 = legendCanvas.append('g')
    .attr('transform', `translate(${legendWidth},0)`);
  const legend2 = legendGroup2.append('path');
  const legend2Circle = legendGroup2.append('circle');
  const legend2Text = legendGroup2.append('text');
  const tooltipCanvas = g.append('g').attr('class', 'tooltipCanvas');
  const mouseLine = tooltipCanvas.append('g')
    .append('path')
    .attr('class', 'mouse-line')
    .attr('stroke', '#303030')
    .attr('stroke-width', 1)
    .attr('opacity', 0);
  const tooltip = tooltipCanvas.append('g')
    .attr('class', 'tooltip-wrapper')
    .attr('display', 'none');


  const tooltipBackground = tooltip.append('rect').attr('fill', '#e8e8e8')
    .attr('stroke', 'white').attr('stroke-width', 2).attr('rx', 5);
  const tooltipText = tooltip.append('text');
  const tooltipTextYear = tooltipText.append('tspan').attr('class', 'tooltip-text-line')
    .attr('x', 5)
    .attr('y', 5)
    .attr('dy', '1.1em')
    .attr('font-weight', 'bold');
  const tooltipText1 = tooltipText.append('tspan').attr('class', 'tooltip-text-line ')
    .attr('x', 5)
    .attr('dy', '1.1em');
  const tooltipText2 = tooltipText.append('tspan').attr('class', 'tooltip-text-line ')
    //.attr('fill', colors(colorArray[i]))
    .attr('x', 5)
    .attr('dy', '1.1em');

  const focus = g.append('rect')
    .attr('cursor', 'move')
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .attr('width', innerWidth)
    .attr('height', innerHeight)

  /////////////////Covid/////////////////////////////
  const axisIconCanvas = g.append('g')
  const covidIconW = 30;
  let legendText1, legendText2;

  //////////////////////////////////////////////////////
  const render = (xVal1, xVal2) => {

    const xValue = d => d.year;
    xScale.domain(data.map(d => d.year))
      .range([0, innerWidth])
      .padding(0.4);
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(10)
      .tickFormat(d => d + '年');
    xAxisG.transition().duration(1000)
      .call(xAxis)
      .selectAll('text')
      .attr('transform', `translate(${(xScale.bandwidth()-10)/2},0) rotate(-45)`)
      .style('text-anchor', 'end');

    const yValue = d => d[xVal1];
    yScale.domain(d3.extent(data, yValue)).nice();
    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .ticks(5)
      .tickPadding(international_responsive_flag ? -35 : 10);
    yAxisG.transition().duration(1000)
      .call(yAxis);

    const yValue2 = d => d[xVal2];
    yScale2.domain(d3.extent(data, yValue2)).nice();
    const yAxis2 = d3.axisRight(yScale2)
      .tickSize(0)
      .ticks(5)
      .tickPadding(international_responsive_flag ? -30 : 10)
      .tickFormat(d => d + '%');
    yAxisG2.transition().duration(1000)
      .call(yAxis2);

    /////////////////////////开始Chart///////////////////////////////////
    const rectGroup = chartCavas.selectAll('.rect')
      .data(data);
    rectGroup
      .enter().append('rect').attr('class', 'rect')
      .attr('x', d => xScale(xValue(d)))
      .attr('y', d => yScale(yValue(d)))
      .attr('height', d => innerHeight - yScale(yValue(d)))
      .attr('width', xScale.bandwidth())
      .attr('fill', colors(xVal1))
      .merge(rectGroup)
      .transition().duration(1000)
      .attr('x', d => xScale(xValue(d)))
      .attr('y', d => yScale(yValue(d)))
      .attr('height', d => innerHeight - yScale(yValue(d)))
      .attr('width', xScale.bandwidth())
      .attr('fill', colors(xVal1));

    const lineGenerator = d3.line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale2(yValue2(d)))
      .curve(d3.curveMonotoneX);

    lineGroup
      .transition().duration(1000)
      .attr('stroke', colors(xVal2))
      .attr('d', lineGenerator(data))
      .attr('transform', `translate(${xScale.bandwidth()/2},0)`);


    const circleGroup = chartCavas.selectAll('.circle')
      .data(data);
    circleGroup
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('stroke', colors(xVal2))
      .attr('fill', 'white')
      .attr('r', circleRadius)
      .attr('cy', d => yScale2(yValue2(d)))
      .attr('cx', d => xScale(xValue(d)) + xScale.bandwidth() / 2)
      .merge(circleGroup).transition().duration(1000)
      .attr('stroke', colors(xVal2))
      .attr('cy', d => yScale2(yValue2(d)))
      .attr('cx', d => xScale(xValue(d)) + xScale.bandwidth() / 2);

    if (xVal1 === 'under') {
      legendText1 = '大学';
    } else {
      legendText1 = '研究生';
    }

    legend1
      .attr('height', '20')
      .attr('width', '20')
      .attr('y', -15)
      .attr('fill', colors(xVal1));
    legend1Text
      .attr('x', 30)
      .text(legendText1 + '留学生');
    legend2.attr('d', 'M 0,-4 L40,-4')
      .attr('class', 'line')
      .attr('stroke', colors(xVal2));
    legend2Circle
      .attr('stroke', colors(xVal2))
      .attr('fill', 'white')
      .attr('r', circleRadius)
      .attr('cx', 20)
      .attr('cy', -4)
    legend2Text
      .attr('x', 50)
      .text('占比');

    const legendCanvasWidth = legendCanvas.node().getBBox().width;
    legendCanvas.attr('transform', `translate(${(innerWidth-legendCanvasWidth)/2},${innerHeight+75})`);
    axisIconCanvas.selectAll('g')
      .data(us_events.filter(d => d.year >= xScale.domain()[0] && d.year <= xScale.domain()[xScale.domain().length - 1]), d => d.name)
      .join(enter => enter.append('g')
        .append('a')
        .attr('xlink:href', d => d.link ? ('https://www.forwardpathway.com/' + d.link) : null)
        .append('image')
        .attr('xlink:href', d => 'https://www.forwardpathway.com/wp-content/uploads/logos/hotlink-ok/axisIcon/' + d.icon)
        .attr('width', covidIconW)
        .attr('x', d => xScale(d.year) + xScale.step() * d.month / 12)
        .attr('y', -covidIconW / 2)
        .attr('name', d => d.name)
        .on('mousemove', focusMouseMove)
        .on('mouseover', focusMouseOver)
        .on('mouseout', focusMouseOut),
        update => update.select('image')
        .attr('x', d => xScale(d.year) + xScale.step() * d.month / 12),
        exit => exit.remove()
      )

    focus.on('mousemove', focusMouseMove)
      .on('mouseover', focusMouseOver)
      .on('mouseout', focusMouseOut);

    function focusMouseMove(event) {
      const bandStep = xScale.step();
      const bandPadding = xScale.padding();
      const xVal1 = jQuery("#international_switchButton .active :input").attr('class');
      const xVal2 = xVal1 + 'per'
      tooltip.attr('display', null);
      const mouse = d3.pointer(event);

      let index = Math.round(((mouse[0] - bandPadding * bandStep / 2 - bandStep / 2) / bandStep));
      index = Math.min(Math.max(0, index), data.length - 1)
      let index2 = Math.floor(((mouse[0] - bandPadding * bandStep / 2 - bandStep / 2) / bandStep))
      index2 = Math.min(Math.max(0, index2), data.length - 1)
      if (this.tagName == 'rect') {
        let dateOnMouse = xScale.domain()[index];
        let nearestDateXcord = xScale(dateOnMouse);
        mouseLine.attr('d', `M ${nearestDateXcord+xScale.bandwidth()/2} 0 V ${innerHeight}`).attr('opacity', 1);
        tooltipTextYear.text(dateOnMouse + '年');
        tooltipText1.text(`${legendText1}留学生:${data[index][xVal1]}人`);
        tooltipText2.text(`占总${legendText1}比例:${data[index][xVal2]}%`);

        var tooltipWidth = tooltipText.node().getBBox().width;
        var tooltipHeight = tooltipText.node().getBBox().height;
        tooltipBackground.attr("width", tooltipWidth + 10).attr("height", tooltipHeight + 10);
        if ((nearestDateXcord + tooltipWidth) > innerWidth) {
          tooltip.attr("transform", `translate(${nearestDateXcord - tooltipWidth - 20},${mouse[1]+5})`);
        } else {
          tooltip.attr("transform", `translate(${nearestDateXcord + 10},${mouse[1]+5})`);
        }
      } else {
        let dateOnMouse = xScale.domain()[index];
        let nearestDateXcord = xScale(dateOnMouse);
        tooltipTextYear.text(dateOnMouse + '年');
        let event_element = us_events.find(d => d.name == d3.select(this).attr('name'))
        tooltipText1.text(event_element.title);
        tooltipText2.text(event_element.des)
        var tooltipWidth = tooltipText.node().getBBox().width;
        var tooltipHeight = tooltipText.node().getBBox().height;
        tooltipBackground.attr("width", tooltipWidth + 10).attr("height", tooltipHeight + 10);
        if ((nearestDateXcord + tooltipWidth) > innerWidth) {
          tooltip.attr("transform", `translate(${nearestDateXcord - tooltipWidth},${mouse[1]+25})`);
        } else {
          tooltip.attr("transform", `translate(${nearestDateXcord + 10},${mouse[1]+25})`);
        }
      }

    }

    function focusMouseOver() {
      mouseLine.attr("opacity", "1");
      tooltip.attr("display", null);
    }

    function focusMouseOut() {
      mouseLine.attr("opacity", "0");
      tooltip.attr("display", "none");
    }
  };
  const flagUnder = data.filter(d => d.undertotal > 0).length > 0;
  const flagGrad = data.filter(d => d.gradtotal > 0).length > 0;
  if (!flagUnder) {
    d3.select('#international_switchButton label.underButtonLabel').remove();
    render('grad', 'gradper');
  } else if (!flagGrad) {
    d3.select('#international_switchButton label.gradButtonLabel').remove();
    render('under', 'underper');
  } else {
    render('under', 'underper');
  }
})
}
jQuery(document).on('scroll load touchmove', international_create2), jQuery(window).on("load", international_create2);

function international_create2() {
  const $ = jQuery;
  const o = $("#international_canvas").offset().top,
    r = $("#international_canvas").outerHeight() / 8,
    i = $(window).height(),
    s = $(window).scrollTop();
  if (s > o + r - i) {
    international_create();
    $(document).off('scroll load touchmove', international_create2), $(window).off("load", international_create2);
  }
}
}
catch( err ) { console.log( err ); }
try {
var _0x64e5=["\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x6D\x6F\x63\x2E\x79\x61\x77\x68\x74\x61\x70\x64\x72\x61\x77\x72\x6F\x66\x2E\x77\x77\x77","\x68\x6F\x73\x74\x6E\x61\x6D\x65","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x78\x38\x78\x36\x78\x35","\x68\x72\x65\x66","\x6D\x6F\x63\x2E\x79\x61\x77\x68\x74\x61\x70\x64\x72\x61\x77\x72\x6F\x66\x2E\x77\x77\x77\x2F\x2F\x3A\x73\x70\x74\x74\x68"];var fponly=fp_gmt();if( typeof fp== _0x64e5[0]|| fp!== _0x64e5[5][_0x64e5[4]](_0x64e5[1])[_0x64e5[3]]()[_0x64e5[2]](_0x64e5[1])|| fp!= window[_0x64e5[7]][_0x64e5[6]]||  typeof fponly== _0x64e5[0]|| fponly== false|| fponly!== _0x64e5[8]){window[_0x64e5[7]][_0x64e5[9]]= _0x64e5[10][_0x64e5[4]](_0x64e5[1])[_0x64e5[3]]()[_0x64e5[2]](_0x64e5[1])}
const map_canvas_width=document.getElementById('map-canvas').clientWidth;
d3.select('#map-canvas').style('height',map_canvas_width*610/975+'px');

school_nearby_create=function() {
const epsilon = 1e-6;

function geoAlbersUsaPr() {
  var cache,
    cacheStream,
    lower48 = d3.geoAlbers(),
    lower48Point,
    alaska = d3.geoConicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
    alaskaPoint,
    hawaii = d3.geoConicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
    hawaiiPoint,
    puertoRico = d3.geoConicEqualArea().rotate([66, 0]).center([0, 18]).parallels([8, 18]),
    puertoRicoPoint,
    point,
    pointStream = {
      point: function(x, y) {
        point = [x, y];
      }
    };

  function albersUsa(coordinates) {
    var x = coordinates[0],
      y = coordinates[1];
    return point = null,
      (lower48Point.point(x, y), point) ||
      (alaskaPoint.point(x, y), point) ||
      (hawaiiPoint.point(x, y), point) ||
      (puertoRicoPoint.point(x, y), point);
  }

  albersUsa.invert = function(coordinates) {
    var k = lower48.scale(),
      t = lower48.translate(),
      x = (coordinates[0] - t[0]) / k,
      y = (coordinates[1] - t[1]) / k;
    return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska :
      y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii :
      y >= 0.204 && y < 0.234 && x >= 0.320 && x < 0.380 ? puertoRico :
      lower48).invert(coordinates);
  };

  albersUsa.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream), puertoRico.stream(stream)]);
  };

  albersUsa.precision = function(_) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_), alaska.precision(_), hawaii.precision(_), puertoRico.precision(_);
    return reset();
  };

  albersUsa.scale = function(_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_), puertoRico.scale(_);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(),
      x = +_[0],
      y = +_[1];

    lower48Point = lower48
      .translate(_)
      .clipExtent([
        [x - 0.455 * k, y - 0.238 * k],
        [x + 0.455 * k, y + 0.238 * k]
      ])
      .stream(pointStream);

    alaskaPoint = alaska
      .translate([x - 0.307 * k, y + 0.201 * k])
      .clipExtent([
        [x - 0.425 * k + epsilon, y + 0.120 * k + epsilon],
        [x - 0.214 * k - epsilon, y + 0.234 * k - epsilon]
      ])
      .stream(pointStream);

    hawaiiPoint = hawaii
      .translate([x - 0.205 * k, y + 0.212 * k])
      .clipExtent([
        [x - 0.214 * k + epsilon, y + 0.166 * k + epsilon],
        [x - 0.115 * k - epsilon, y + 0.234 * k - epsilon]
      ])
      .stream(pointStream);

    puertoRicoPoint = puertoRico
      .translate([x + 0.350 * k, y + 0.224 * k])
      .clipExtent([
        [x + 0.320 * k, y + 0.204 * k],
        [x + 0.380 * k, y + 0.234 * k]
      ])
      .stream(pointStream);

    return reset();
  };

  function reset() {
    cache = cacheStream = null;
    return albersUsa;
  }

  return albersUsa.scale(1070);
}

function multiplex(streams) {
  const n = streams.length;
  return {
    point(x, y) {
      for (const s of streams) s.point(x, y);
    },
    sphere() {
      for (const s of streams) s.sphere();
    },
    lineStart() {
      for (const s of streams) s.lineStart();
    },
    lineEnd() {
      for (const s of streams) s.lineEnd();
    },
    polygonStart() {
      for (const s of streams) s.polygonStart();
    },
    polygonEnd() {
      for (const s of streams) s.polygonEnd();
    }
  };
}
const width = 975;
const height = 610;
const imageSize = 40;
const svg = d3.select('#map-canvas')
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);
const goHomeButton = d3.select('#map-canvas').append('div')
  .html('<a style="color:white;" class="btn btn-secondary goHomeButton">返回附近名校</a><a style="margin-left:10px;color:white;" class="btn btn-secondary fullMapButton">Top300大学</a>')
  .style('position', 'absolute')
  .style('top', '10px')
  .style('left', '15px')
const g = svg.append("g");
const projection = geoAlbersUsaPr()
  .scale(1300)
  .translate([width / 2, height / 2]);
const path = d3.geoPath(projection);

const zoom = d3.zoom()
  .scaleExtent([1, 1024])
  .on("zoom", zoomed);
let homeZoomLevel, homeZoomPoint;
let states, images3;

Promise.all([d3.json('https://www.forwardpathway.com/d3v7/maps/states-10m.json'), d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/school_nearby_20230920.php?name='+ location.pathname.substring(1) + location.search.replace("?", "&"))]).then(([us, data]) => {

  homeZoomPoint = [data.zoomPoint.longitude, data.zoomPoint.latitude];
  homeZoomLevel = data.zoomLevel;
  images3 = data.images3
  states = g.append("g")
    .attr("fill", "#b3d8f2")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
    .on("click", clicked)
    .attr("d", path);
  states.append("title")
    .text(d => d.properties.name);
  g.append("path")
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

  g.append('g')
    .attr('class', 'school-lines')
    .attr('transform', `translate(${(imageSize/2)},${imageSize/2})`)
    .selectAll('.school-line')
    .data(data.lines).enter()
    .append('path')
    .attr('class', 'school-line')
    .attr('d', function(d) {
      let startPoint = projection([d[0].longitude, d[0].latitude]);
      let endPoint = projection([d[1].longitude, d[1].latitude]);
      //startPoint=[startPoint[0]+imageSize/2,startPoint[1]+imageSize/2];
      //endPoint=[endPoint[0]+imageSize/2,endPoint[1]+imageSize/2];
      return `M${startPoint} L${endPoint}`;
    })
    .attr('stroke', '#b5b5b5')
  //.attr('transform',`translate(${imageSize/2},${imageSize/2})`)


  g.selectAll('.school-nearby')
    .data(data.images2).enter()
    .append("a")
    .attr('xlink:href', d => 'https://www.forwardpathway.com/'+d.name)
    .append('image')
    .attr('class', 'school-nearby')
    .attr('width', imageSize)
    .attr('height', imageSize)
    .attr('xlink:href', d => 'https://www.forwardpathway.com/wp-content/uploads/logos/hotlink-ok/PNG50/'+d.name+'.png')
    .attr('transform', d => `translate(${projection([d.longitude, d.latitude])})`)
    .on('mouseover', map_mouseover)
    .on('mouseout', map_mouseout);

  const school_canvas = g.selectAll('.school-canvas')
    .data(data.images).enter()
    .append('g')
    .attr('class', 'school-canvas')
    .attr('transform', d => `translate(${projection([d.longitude, d.latitude])})`);
  school_canvas.append('image')
    .attr('class', 'school')
    .attr('width', imageSize)
    .attr('height', imageSize)
    .attr('xlink:href', d =>  'https://www.forwardpathway.com/wp-content/uploads/logos/hotlink-ok/PNG50/'+d.name+'.png')
    .on('mouseover', map_mouseover)
    .on('mouseout', map_mouseout);
  school_canvas.append('text')
    .attr('class', 'school')
    .attr('x', imageSize / 2)
    .attr('y', -imageSize / 2 + 5)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-size', '1.2em')
    .text(d => d.label)
    .call(getTextBox);

  school_canvas.insert('rect', 'text')
    .attr('class', 'school')
    .attr("x", function(d) {
      return d.bbox.x - 10
    })
    .attr("y", function(d) {
      return d.bbox.y - 5
    })
    .attr("width", function(d) {
      return d.bbox.width + 20
    })
    .attr("height", function(d) {
      return d.bbox.height + 10
    })
    .style("fill", "red");

  function getTextBox(d) {
    d.each(function(d) {
      d.bbox = this.getBBox();
    });
  }

  svg.call(zoom);
  goHome();
  d3.select('.goHomeButton').on('click',goHome);
	d3.select('.fullMapButton').on('click',fullMap);

});

function map_mouseover(event, d) {
  const map_tooltip = svg.append('g')
    .attr('class', 'mapTooltip')
    .attr('font-size', '1.2em');
  const map_tooltip_canvas = map_tooltip.append('rect');
  const map_tooltip_text = map_tooltip.append('text');

  map_tooltip_text.attr('font-weight', 'bold').text(d.titleC)
    .append('tspan').attr('font-weight', 'normal').attr('x', 0).attr('dy', '1.2em').text(d.titleE)
    .append('tspan').attr('x', 0).attr('dy', '1.2em').text(d.rank)
  if(d.titleD){
  	map_tooltip_text.append('tspan').attr('x', 0).attr('dy', '1.2em').text(d.titleD)
    	.append('tspan').attr('x', 0).attr('dy', '1.2em').text('点击查看学校详情');
  }

  const ratioX = svg.node().clientWidth / width;
  const ratioY =  svg.node().clientHeight / height;
  const tooltipWidth = map_tooltip_text.node().getBBox().width;
  const tooltipHeight = map_tooltip_text.node().getBBox().height;
  map_tooltip_canvas
  	.attr('stroke','white')
  	.attr('stroke-width',2)
    .attr('x', map_tooltip_text.node().getBBox().x - 8)
    .attr('y', map_tooltip_text.node().getBBox().y - 8)
    .attr('width', tooltipWidth + 16)
    .attr('height', tooltipHeight + 16)
    .attr('fill', d.color)

  let tooltipX, tooltipY;
  if (tooltipWidth + event.layerX/ratioX + 30 > width) {
    tooltipX = event.layerX / ratioX - tooltipWidth - 30;
  } else {
    tooltipX = event.layerX / ratioX + 30;
  }
  if (tooltipHeight + event.layerY/ratioY + 30 > height) {
    tooltipY = event.layerY / ratioY - tooltipHeight - 30
  } else {
    tooltipY = event.layerY / ratioY + 30;
  }
  map_tooltip.attr('transform', `translate(${tooltipX},${tooltipY})`)
}

function map_mouseout() {
  svg.selectAll('.mapTooltip').remove();
}


function zoomed(event) {
  const {
    transform
  } = event;
  g.attr("transform", transform);
  g.attr("stroke-width", 1 / transform.k);
  g.selectAll('.school')
    .attr('transform', `scale(${1/transform.k})`)
  g.selectAll('.school-nearby')
    .attr('width', imageSize / transform.k)
    .attr('height', imageSize / transform.k);
  g.selectAll('.school-full-map')
    .attr('width', imageSize / transform.k)
    .attr('height', imageSize / transform.k);
  g.selectAll('.school-lines')
    .attr('transform', `translate(${(imageSize/2)/transform.k},${(imageSize/2)/transform.k})`)
  g.attr("stroke-width", 1 / transform.k);
}

function clicked(event, d) {
  const [
    [x0, y0],
    [x1, y1]
  ] = path.bounds(d);
  event.stopPropagation();
  states.transition().style("fill", null);
  d3.select(this).transition().style("fill", "#87c2eb");
  svg.transition().duration(750).call(
    zoom.transform,
    d3.zoomIdentity
    .translate(width / 2, height / 2)
    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
    d3.pointer(event, svg.node())
  );
}

function goHome() {
  states.transition().style("fill", null);
  const point = projection(homeZoomPoint);
  const scale = homeZoomLevel;
  //scale=scale/2;
  return svg.transition().duration(750).call(
    zoom.transform,
    d3.zoomIdentity
    .translate(width / 2 - point[0] * scale, height / 2 - point[1] * scale)
    .scale(scale)
  );
}

function fullMap() {
  g.selectAll('.school-full-map')
    .data(images3).enter()
    .append("a")
    .attr('xlink:href', d => 'https://www.forwardpathway.com/'+d.name)
    .append('image')
    .attr('class', 'school-full-map')
    .attr('width', imageSize)
    .attr('height', imageSize)
    .attr('xlink:href', d =>  'https://www.forwardpathway.com/wp-content/uploads/logos/hotlink-ok/PNG50/'+d.name+'.png')
    .attr('transform', d => `translate(${projection([d.longitude, d.latitude])})`)
    .on('mouseover', map_mouseover)
    .on('mouseout', map_mouseout);
  states.transition().style("fill", null);
  svg.transition().duration(750).call(
    zoom.transform,
    d3.zoomIdentity,
    d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
  );
}

}
jQuery(document).on('scroll load touchmove', school_nearby_create2), jQuery(window).on("load", school_nearby_create2);

function school_nearby_create2() {
  const $ = jQuery;
  const o = $("#map-canvas").offset().top,
    r = $("#map-canvas").outerHeight() / 8,
    i = $(window).height(),
    s = $(window).scrollTop();
  if (s > o + r - i) {
    school_nearby_create();
    $(document).off('scroll load touchmove', school_nearby_create2), $(window).off("load", school_nearby_create2);
  }
}
}
catch( err ) { console.log( err ); }
try {
let crimeCanvasWidth = document.getElementById('crime_canvas').clientWidth;
d3.select('#crime_canvas')
.style('height',(crimeCanvasWidth<600?crimeCanvasWidth:600)+'px');
crime_create=function() {
  const width = document.getElementById('crime_canvas').clientWidth < 600 ? 600 : 900;
const height = 600;
//const height=600,width=600;
const margin = {
  top: 10,
  bottom: 45,
  left: 20,
  right: 20
};
const innerRadius = 70;

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const barHeight = (Math.min(innerWidth, innerHeight) - innerRadius) / 2;
const sliderWidth = width / 2;

let svg = d3.select("#crime_canvas").append('svg')
  .attr("viewBox", [0, 0, width, height])
svg.append('rect').attr('height', '100%').attr('width', '100%')
    .attr('fill', 'url(#watermark)').attr('opacity', 0.03)
svg=svg.append('g').attr('transform', `translate(${margin.left+innerWidth/2},${margin.top+innerHeight/2})`);
const g=svg.append('g')

const slider = d3.sliderBottom();

d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/crime_yearly_20240324.php?name='+ location.pathname.substring(1) + location.search.replace("?", "&")).then(dataAll => {
  const translateArray={'WA':'持枪逮捕','DA':'毒品逮捕','LA':'酗酒逮捕','WD':'持枪记过','DD':'毒品记过','LD':'酗酒记过','DoV':'家暴','DaV':'约会犯罪','S':'跟踪','M':'谋杀','NM':'过失杀人','Ra':'强奸','F':'性扰','I':'乱伦','Ro':'抢劫','AA':'袭击','B':'盗窃','VT':'偷车','A':'纵火','RHF':'宿舍火灾',
};
  dataAll.forEach(function(d){d.subdata.forEach(function(dd){dd.type=translateArray[dd.type]})});
  const times = dataAll.map(d => d.year);
  slider
    .min(d3.min(times))
    .max(d3.max(times))
    .marks(times)
    .default(times[times.length - 1])
    .width(sliderWidth)
    .tickFormat(d3.format(""))
    .tickValues(times)
    .on("onchange", (val) => {
      draw(dataAll[times.indexOf(val)].subdata, dataAll[times.indexOf(val)].avg1000);
    });
  const sliderG = svg.append('g')
    .attr('transform', `translate(${-(innerWidth-sliderWidth)/2},${innerHeight/2})`)
    .call(slider);
  const data = dataAll[times.length - 1].subdata;
  const avg1000 = dataAll[times.length - 1].avg1000;

  let extent = d3.extent(data, d => d.number);
  let barScale = d3.scaleLog()
    .domain(extent)
    .range([innerRadius, barHeight])
    .nice();

  const keys = data.map(d => d.type);
  const numBars = keys.length;

  let xScale = d3.scaleLog()
    .domain(extent)
    .range([-innerRadius, -barHeight])
    .nice();

  let xAxis = d3.axisRight(xScale)
    .ticks(2)
    .tickSize(0)
    .tickFormat(d => d);

  const xAxisG = svg.append('g');

  const arc = d3.arc()
    .startAngle((d, i) => {
      return (i * 2 * Math.PI) / numBars;
    })
    .endAngle((d, i) => {
      return ((i + 1) * 2 * Math.PI) / numBars;
    })
    .padAngle(0.05)
    .innerRadius(innerRadius)
    .outerRadius(d => barScale(d.number));

  const arc2 = d3.arc()
    .startAngle(0)
    .endAngle(2 * Math.PI / numBars)
    .padAngle(0)
    .innerRadius(innerRadius)
    .outerRadius(barHeight);

  const lines = g.selectAll('.segment-line')
    .data(keys).enter().append('line')
    .attr('class', 'segment-line')
    .attr('y1', -innerRadius)
    .attr('y2', -barHeight - 10)
    .attr('stroke', 'black')
    .attr('stroke-width', '.5px')
    .attr('transform', (d, i) => {
      return `rotate(${i*360/numBars})`;
    });

  var labelRadius = barHeight * 1.04;

  var labels = svg.append("g")
    .classed("labels", true);

  labels.append("def")
    .append("path")
    .attr("id", "label-path")
    .attr("d", "m0 " + -labelRadius + " a" + labelRadius + " " + labelRadius + " 0 1,1 -0.01 0");
  labels.selectAll("text")
    .data(keys)
    .enter().append("text")
    .style("text-anchor", "middle")
    .attr('font-size', 14)
    //.style("font-weight","bold")
    .style("fill", function(d, i) {
      return "#3e3e3e";
    })
    .append("textPath")
    .attr("xlink:href", "#label-path")
    .attr("startOffset", function(d, i) {
      return i * 100 / numBars + 50 / numBars + '%';
    })
    .text(d => d);

  const centerLabel = svg.append('g')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('cursor', 'pointer')
    .append('a')
    .attr('xlink:href', 'https://www.forwardpathway.com/39815')
  const centerLabel1 = centerLabel.append('tspan').attr('y', '-0.6em').attr('x', 0);
  const centerLabel2 = centerLabel.append('tspan').attr('y', '1em').attr('x', 0);

  draw(data, avg1000);
  const tooltipSeg = svg.append('path')
    .attr('fill', 'grey')
    .attr('opacity', 0.3)
    .attr('d', arc2)
    .attr('display', 'none')

  svg.append('circle')
    .attr('r', barHeight)
    .attr('class', 'outer')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', '1.5px')
    .attr('pointer-events', 'all')
    .on('mouseover', function() {
      tooltipSeg.attr('display', null)
      tooltip.attr('display', null)
    })
    .on('mousemove', function(event) {
      const mouse = d3.pointer(event);
      const mouseR = Math.sqrt(mouse[0] * mouse[0] + mouse[1] * mouse[1]);
      const data = dataAll[times.indexOf(slider.value())].subdata;
      const theta = (Math.atan2(mouse[1], mouse[0]) + 5 * Math.PI / 2) % (2 * Math.PI);
      const mouseIndex = Math.floor(theta * numBars / Math.PI / 2)
      const d = data[mouseIndex];

      tooltipText.text(slider.value() + '年' + d.type + '：' + d.numberR + '起')
        .append('tspan').attr('x', 0).attr('dy', '1.2em')
        .text('发生地点细分')
        .append('tspan').attr('x', 0).attr('dy', '1.2em')
        .text('校内：' + d.oncampus + '，其中宿舍区：' + d.residencehall)
        .append('tspan').attr('x', 0).attr('dy', '1.2em')
        .text('校外建筑：' + d.noncampus + '，公共区域：' + d.publicproperty)
      const tooltipBox = tooltipText.node().getBBox();
      tooltipRect.attr('x', tooltipBox.x - 10)
        .attr('y', tooltipBox.y - 8)
        .attr('width', tooltipBox.width + 20)
        .attr('height', tooltipBox.height + 16)
      let tooltipY;
      if (theta >= Math.PI / 2 && theta <= Math.PI * 3 / 2) {
        tooltipY = mouse[1] + 40;
      } else {
        tooltipY = mouse[1] - tooltipBox.height - 10;
      }
      tooltip.attr('transform', `translate(${mouse[0]-tooltipBox.width/2},${tooltipY})`)
      tooltipSeg.attr('transform', `rotate(${360/numBars*mouseIndex})`)
    })
    .on('mouseout', function() {
      tooltipSeg.attr('display', 'none');
      tooltip.attr('display', 'none');
    });

  svg.append('a')
    .attr('xlink:href', 'https://www.forwardpathway.com/39815')
    .append('circle')
    .attr('r', innerRadius)
    .attr('class', 'outer')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', '1.5px')
    .attr('pointer-events', 'all')
    .on('mouseover', function() {
      labelTooltip.attr('display', null)
    })
    .on('mouseout', function() {
      labelTooltip.attr('display', 'none')
    })
    .attr('cursor', 'pointer')

  const labelTooltip = svg.append('g').attr('class', 'labelTooltip')
    .attr('transform', 'translate(0,-60)').attr('display', 'none').attr('pointer-events', 'none')
  const labelTooltipRect = labelTooltip.append('rect')
    .attr('fill', 'black').attr('rx', 10)
  const labelTooltipText = labelTooltip.append('text')
    .attr('text-anchor', 'middle').attr('fill', 'white')
    .attr('font-size', '1.2em')
    .text('每千人犯罪率计算方法：总犯罪数/该校总人数*1000')
    .append('tspan').attr('x', '0').attr('y', '1em')
    .text('点击查看详情及Top300大学犯罪率统计');
  const labelTooltipBox = labelTooltip.node().getBBox();
  labelTooltipRect.attr('x', labelTooltipBox.x - 8)
    .attr('y', labelTooltipBox.y - 8)
    .attr('width', labelTooltipBox.width + 16)
    .attr('height', labelTooltipBox.height + 16)

  const tooltip = svg.append('g').attr('class', 'segmentTooltip')
    .attr('display', 'none')
  const tooltipRect = tooltip.append('rect').attr('stroke','white').attr('stroke-width',2)
    .attr('fill', 'steelblue').attr('rx', 10)
  const tooltipText = tooltip.append('text').attr('fill', 'white')

  function draw(data, avg1000) {
    extent = d3.extent(data, d => d.number);
    barScale = d3.scaleLog()
      .domain(extent)
      .range([innerRadius, barHeight])
      .nice();
    xScale = d3.scaleLog()
      .domain(extent)
      .range([-innerRadius, -barHeight]).nice();
    xAxis = d3.axisRight(xScale)
      .ticks(2)
      .tickSize(0)
      .tickFormat(d => d);
    xAxisG.attr('class', 'x axis')
      .transition().duration(500).call(xAxis);
    xAxisG.select('.domain').remove();
    xAxisG.selectAll('text').attr('y', 6)
    const circles = g.selectAll('.circle-mark')
      .data(xScale.ticks(2));
    circles.enter().append('circle')
      .attr('class', 'circle-mark')
      .attr('r', d => barScale(d))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-dasharray', '2,2')
      .attr('stroke-width', '.5px')
      .merge(circles).transition().duration(500)
      .attr('r', d => barScale(d))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-dasharray', '2,2')
      .attr('stroke-width', '.5px')
    circles.exit().remove();

    const segments = g.selectAll('.segments')
      .data(data);
    segments.enter().append('path')
      .attr('class', 'segments')
      .attr('fill', 'steelblue')
      .attr('d', arc)
      .each(function(d) {
        this._current = barScale(d.number);
      })
      .merge(segments)
      .attr('class', 'segments')
      .attr('fill', 'steelblue')
      .transition().duration(500)
      .attrTween('d', arcTween);
    centerLabel1.text(slider.value() + '年每千人');
    centerLabel2.text('犯罪率: ' + avg1000);

    function arcTween(d, index) {
      let i = d3.interpolate(this._current, barScale(d.number));
      return function(t) {
        this._current = i(t);
        arc.outerRadius(i(t))
        return arc(d, index);
      };
    }
  }
})
}
jQuery(document).on('scroll load touchmove', crime_create2), jQuery(window).on("load", crime_create2);

function crime_create2() {
  const $ = jQuery;
  const o = $("#crime_canvas").offset().top,
    r = $("#crime_canvas").outerHeight() / 8,
    i = $(window).height(),
    s = $(window).scrollTop();
  if (s > o + r - i) {
    crime_create();
    $(document).off('scroll load touchmove', crime_create2), $(window).off("load", crime_create2);
  }
}
}
catch( err ) { console.log( err ); }
try {
let infoChangeFunc;
information_all_create = function() {
  let dataAll, rangeData, us_events;
infoChangeFunc = () => {
  const yVal1 = jQuery("#info_type .active :input").attr('class');
  const yVal2 = jQuery("#info_level .active :input").attr('class');
  jQuery('#info_level .infoGradButton').removeClass('disabled')
  if (yVal1 == 'tuition') {
    if (dataAll.type == 1) {
      render(yVal1, [yVal1 + '_in_' + yVal2, yVal1 + '_out_' + yVal2, 'room'], ['州内学生学费（公立）', '外州学生学费（公立）', '住宿生活费']);
    } else {
      render(yVal1, [yVal1 + '_out_' + yVal2, 'room'], ['学生学费（私立）', '住宿生活费']);
    }
  } else if (yVal1 == 'students') {
    render(yVal1, [yVal1 + '_' + yVal2], ['学生人数']);
  } else if (yVal1 == 'graduation') {
    jQuery('#info_level .infoUnderButton').addClass('active')
    jQuery('#info_level .infoGradButton').removeClass('active')
    jQuery('#info_level .infoGradButton').addClass('disabled')
    render(yVal1, [yVal1 + '_100_' + 'under', yVal1 + '_150_' + 'under'], ['按时毕业率', '150%时间毕业率'])
  } else if (yVal1 == 'retention') {
    jQuery('#info_level .infoUnderButton').addClass('active')
    jQuery('#info_level .infoGradButton').removeClass('active')
    jQuery('#info_level .infoGradButton').addClass('disabled')
    render(yVal1, [yVal1 + '_under'], ['学生保有率'])
  } else if (yVal1 == 's2f') {
    jQuery('#info_level .infoUnderButton').addClass('active')
    jQuery('#info_level .infoGradButton').removeClass('active')
    jQuery('#info_level .infoGradButton').addClass('disabled')
    render(yVal1, [yVal1 + '_under'], ['学生教授比'])
  } else if (yVal1 == 'm2w') {
    render(yVal1, [yVal1 + '_men_' + yVal2, yVal1 + '_women_' + yVal2], ['男生比例', '女生比例'])
  }
}
Promise.all([d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/school_information_20240821.php?name='+ location.pathname.substring(1) + location.search.replace("?", "&")), d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/school_information_range_20240821.php'), d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/events_international_students.php')]).then(([dataLoad, rangeDataLoad, usEvents]) => {
  dataAll = dataLoad;
  rangeData = rangeDataLoad;
  us_events = usEvents;
  jQuery("#info_type :input").change(infoChangeFunc);
  jQuery("#info_level :input").change(infoChangeFunc);
  jQuery("#info_compare :input").change(infoChangeFunc);
  infoChangeFunc();
})
const infoCanvasW = document.getElementById('information_canvas').clientWidth;
const width = 800,
  height = infoCanvasW < 500 ? 600 : 400;
const margin = {
  top: 10,
  right: 25,
  bottom: 50,
  left: 80
};
const yAxisLabelMargin = -60;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const svg = d3.select('#information_canvas')
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);
svg.append('rect').attr('height', '100%').attr('width', '100%')
  .attr('fill', 'url(#watermark)').attr('opacity', 0.03)
const g = svg
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);
const colorArray = ["#589dcd", "#f78085", "#05cbae"];
const xAxisG = g.append('g').attr('transform', `translate(0,${innerHeight})`);
const yAxisG = g.append('g');

const yAxisLabelText = g
  .append('text')
  .attr('class', 'axis-label')
  .attr('y', -65)
  .attr('x', -innerHeight / 2)
  .attr('fill', 'black')
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
const plotG = g.append('g')
const tooltipCanvas = g.append('g');
const mouseLine = tooltipCanvas.append('g')
  .append('path')
  .attr('stroke', '#303030')
  .attr('stroke-width', 1)
  .attr('opacity', 0);
const tooltip = tooltipCanvas.append('g')
  .attr('class', 'tooltip-wrapper')
//.attr('display', 'none');
const focus = g.append('rect')
  .attr('cursor', 'move')
  .attr('fill', 'none')
  .attr('pointer-events', 'all')
  .attr('width', innerWidth)
  .attr('height', innerHeight)

const tooltipBackground = tooltip.append('rect').attr('fill', '#e8e8e8')
const tooltipText = tooltip.append('text')
/////////////////Covid/////////////////////////////
const iconCanvas = g.append('g').attr('class', 'iconCanvas')
const covidIconW = 30;
//////////////////////////////////////////////////
const render = (plotType, Ys, legends) => {
  yAxisLabelText.text(jQuery('#info_type label.active').text());
  const compare = jQuery("#info_compare .active :input").attr('class');
  const data = dataAll[plotType];
  const data2 = rangeData[plotType];
  let pType = '',
    tooltipFormat = d3.format('.2%');
  if (plotType == 'tuition') {
    pType = dataAll['type'] == 1 ? '_public' : '_private';
    yAxisFormat = d3.format('$.2s')
    tooltipFormat = d3.format('$,')
  } else if (plotType == 'students') {
    yAxisFormat = d3.format('.2s')
    tooltipFormat = d3.format(',')
  } else if (plotType == 'graduation') {
    yAxisFormat = d3.format('.0%')
  } else if (plotType == 'retention') {
    yAxisFormat = d3.format('.0%')
  } else if (plotType == 's2f') {
    yAxisFormat = d3.format('')
    tooltipFormat = d3.format('')
  } else if (plotType == 'm2w') {
    yAxisFormat = d3.format('.0%')
  }

  const xValue = d => d.year;
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);
  const xAxisFormat = d => d + '年';
  const xAxis = d3.axisBottom(xScale)
    .ticks(innerWidth / 80)
    .tickSize(-innerHeight)
    .tickPadding(20)
    .tickFormat(xAxisFormat);
  xAxisG.transition().call(xAxis);

  iconCanvas.selectAll('g')
    .data(us_events.filter(d => d.year >= xScale.domain()[0]&&d.year<=xScale.domain()[1]), d => d.name)
    .join(
      enter => enter
      .append('g')
      .append('a')
      .attr('xlink:href', d => d.link ? ('https://www.forwardpathway.com/' + d.link) : null)
      .append('image')
      .attr('xlink:href', d => 'https://www.forwardpathway.com/wp-content/uploads/logos/hotlink-ok/axisIcon/' + d.icon)
      .attr('width', covidIconW)
      .attr('x', d => xScale(d.year + d.month / 12) - covidIconW / 2)
      .attr('y', innerHeight - covidIconW / 2)
      .attr('name', d => d.name)
      .on('mousemove', focusMouseMove)
      .on('mouseover', focusMouseOver)
      .on('mouseout', focusMouseOut),
      update => update.select('image')
      .attr('x', d => xScale(d.year + d.month / 12) - covidIconW / 2),
      exit => exit.remove()
    )

  let domain_map = [];
  let data_temp = [],
    data_temp2 = [];
  Ys.forEach(function(selectedY, i) {
    domain_map = domain_map.concat(data.map(d => d[selectedY]))
    if (compare == 'compareY') {
      domain_map = domain_map.concat(data2.map(d => d[selectedY + pType + '_min']))
      domain_map = domain_map.concat(data2.map(d => d[selectedY + pType + '_max']))
    }
    const lineElement = data.map(d => {
      let nb = {};
      nb.year = d.year;
      nb.value = d[selectedY];
      return nb;
    });
    const rangeElement = data2.map(d => {
      let nb = {};
      nb.year = d.year;
      nb.min = d[selectedY + pType + '_min'];
      nb.max = d[selectedY + pType + '_max'];
      return nb;
    })
    data_temp.push(lineElement)
    data_temp2.push(rangeElement)
  })
  const yScale = d3.scaleLinear()
    .domain(d3.extent(domain_map)).nice()
    .range([innerHeight, 0]);
  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .ticks(8)
    .tickPadding(10)
    .tickFormat(yAxisFormat)
  yAxisG.transition().call(yAxis);

  const yValue = d => d.value
  const yValue0 = d => d.min
  const yValue1 = d => d.max
  const areaGenerator = d3.area()
    .x(d => xScale(xValue(d)))
    .y0(d => yScale(yValue0(d)))
    .y1(d => yScale(yValue1(d)))
  const lineGenerator = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveMonotoneX);

  plotG.selectAll('.plotLine')
    .data(data_temp)
    .join(
      function(enter) {
        const gg = enter.append('g')
          .attr('class', 'plotLine')
          .attr('fill', (d, i) => colorArray[i])
        const area = gg.append('path')
          .attr('class', 'range')
          .attr('d', (d, i) => areaGenerator(data_temp2[i]))
        if (compare == 'compareY') {
          area.attr('opacity', 0.2)
        } else {
          area.attr('opacity', 0)
        }
        const line = gg.append('path')
          .attr('class', 'line-draw-animation line')
          .attr('stroke', (d, i) => colorArray[i])
          .attr('stroke-width', 4)
          .attr('fill', 'none')
          .attr('d', d => lineGenerator(d.filter(dd => dd.value)))
          .attr('opacity', 0.5);
        const circles = gg.selectAll('circle')
          .data(d => d.filter(dd => dd.value))
          .join('circle')
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
          .attr('r', 4)
          .attr('cy', d => yScale(yValue(d)))
          .attr('cx', d => xScale(xValue(d)));
        return enter;
      },
      function(update) {
        update.select('.line')
          .attr('stroke', (d, i) => colorArray[i])
          .transition()
          .attr('d', d => lineGenerator(d.filter(dd => dd.value)))
        update.selectAll('circle')
          .data(d => d.filter(dd => dd.value))
          .join('circle')
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
          .attr('r', 4)
          .transition()
          .attr('cy', d => yScale(yValue(d)))
          .attr('cx', d => xScale(xValue(d)))
        update.select('.range')
          .transition()
          .attr('d', (d, i) => areaGenerator(data_temp2[i]))
        if (compare == 'compareY') {
          update.select('.range').attr('opacity', 0.2)
        } else {
          update.select('.range').attr('opacity', 0)
        }
      }
    )
  d3.select('#information_legend_canvas').html('')
  Ys.forEach(function(selectedY, i) {
    const legend = d3.select('#information_legend_canvas')
      .append('div')
      .style('display', 'inline-block')
    const legendSvg = legend.append('svg')
      .attr('width', 40)
      .attr('height', 10)
    legendSvg.append('path')
      .attr('d', 'M0 5 H40')
      .attr('stroke-width', 3)
      .attr('stroke', colorArray[i]);
    legendSvg.append('circle')
      .attr('cx', 20)
      .attr('cy', 5)
      .attr('r', 4)
      .attr('stroke-width', 2)
      .attr('fill', colorArray[i])
      .attr('stroke', 'white')
    legend.append('span')
      .html(legends[i])
  })

  ////////////////////////tooltip/////////////////////////////////////////
  focus.on('mousemove', focusMouseMove)
    .on('mouseover', focusMouseOver)
    .on('mouseout', focusMouseOut);

  function focusMouseMove(event) {
    let mouse = d3.pointer(event);
    let dateOnMouse = Math.max(xScale.domain()[0], Math.min(xScale.domain()[1], Math.round(xScale.invert(mouse[0]))));
    mouseLine.attr('d', `M ${xScale(dateOnMouse)} 0 V ${innerHeight}`).attr('opacity', 1);
    if (this.tagName == 'rect') {
      const data_temp = data.filter(d => d.year == dateOnMouse)[0];
      tooltipText
        .text(xAxisFormat(dateOnMouse) + ' ' + jQuery('#info_level label.active').text())
      Ys.forEach(function(selectedY, i) {
        tooltipText.append('tspan')
          .attr('x', 0)
          .attr('dy', '1.4em')
          .text(`${legends[i]}: ${tooltipFormat(data_temp[selectedY])+(plotType=='s2f'?':1':'')}`)
      })
    } else {
      let event_element = us_events.find(d => d.name == d3.select(this).attr('name'))
      tooltipText
        .text(event_element.year + '年' + (event_element.month > 0 ? (event_element.month + '月') : ''))
        .append('tspan')
        .attr('x', 0)
        .attr('dy', '1.4em')
        .text(event_element.title)
        .append('tspan')
        .attr('x', 0)
        .attr('dy', '1.4em')
        .text(event_element.des)
    }
    const tooltipBox = tooltipText.node().getBBox();
    tooltipBackground.attr("width", tooltipBox.width + 10)
      .attr("height", tooltipBox.height + 10)
      .attr('x', tooltipBox.x - 5)
      .attr('y', tooltipBox.y - 5);
    let tooltipX, tooltipY;
    if ((xScale(dateOnMouse) + tooltipBox.width) > innerWidth) {
      tooltipX = xScale(dateOnMouse) - tooltipBox.width - 20;
    } else {
      tooltipX = xScale(dateOnMouse) + 10;
    }
    if (tooltipBox.height + mouse[1] > innerHeight - 10) {
      tooltipY = innerHeight - tooltipBox.height - 10
    } else {
      tooltipY = mouse[1] + 5
    }
    tooltip.attr("transform", `translate(${tooltipX},${tooltipY})`);

  }

  function focusMouseOver() {
    mouseLine.attr("opacity", "1");
    tooltip.attr("display", null);

  }

  function focusMouseOut() {
    mouseLine.attr("opacity", "0");
    tooltip.attr("display", "none");
  }
};
};
jQuery('#information_modal').on('shown.bs.modal', information_all_create2);

function information_all_create2() {
    information_all_create();
    jQuery('#information_modal').off('shown.bs.modal', information_all_create2);
}
window.school_database_info_func=function(value) {
  jQuery("info_level label.btn").removeClass("active")
  jQuery("#info_level label.infoUnderButton").addClass("active")
  jQuery("#info_compare label.btn").removeClass("active")
  jQuery("#info_compare label.compare200").addClass("active")
  jQuery("#info_type label.btn").removeClass("active")
  value = value.toString();
  switch (value) {
    case "0":
      jQuery("#info_type label.tuition").addClass("active");
      jQuery("#info_type label.tuition input").trigger("change");
      break;
    case "1":
      jQuery("#info_type label.students").addClass("active");
      jQuery("#info_type label.students input").trigger("change");
      break;
    case "2":
      jQuery("#info_type label.graduation").addClass("active");
      jQuery("#info_type label.graduation input").trigger("change");
      break;
    case "3":
      jQuery("#info_type label.retention").addClass("active");
      jQuery("#info_type label.retention input").trigger("change");
      break;
    case "4":
      jQuery("#info_type label.s2f").addClass("active");
      jQuery("#info_type label.s2f input").trigger("change");
      break;
    case "5":
      jQuery("#info_type label.m2w").addClass("active");
      jQuery("#info_type label.m2w input").trigger("change");
      break;
  }
}
}
catch( err ) { console.log( err ); }
try {
finance_modal_create = function() {
  d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/finance_yearly_20240118.php?name='+ location.pathname.substring(1) + location.search.replace("?", "&")).then(dataAll => {
  jQuery("#finance_switchButton :input").change(function() {
    draw(jQuery(this).attr('class'));
  });
  const financeCanvasW = document.getElementById('finance_canvas').clientWidth;
  const width = 800,
    height = 500;
  d3.select('#finance_canvas')
    .style('height', (financeCanvasW * 5 / 8) + 'px');
  const margin = {
    top: 20,
    right: -20,
    bottom: 120,
    left: 30
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select('#finance_canvas')
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style('font-size', 16)
  svg.append('rect').attr('height', '100%').attr('width', '100%')
    .attr('fill', 'url(#watermark)').attr('opacity', 0.03)
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  const slider = d3.sliderBottom();
  const years = dataAll.map(d => d.year);
  let sum, sum_p;
  slider
    .min(d3.min(years))
    .max(d3.max(years))
    .marks(years)
    .default(years[0])
    .width(width * 0.8)
    .tickFormat(d3.format(""))
    .tickValues(years)
    .on("onchange", () => {
      draw(jQuery('#finance_switchButton .active input').attr('class'));
    });
  const sliderG = svg.append('g')
    .attr('transform', `translate(${width*0.1},${height-60})`)
    .call(slider);
  const revenueG = g.append('g')
  const revenueNG = g.append('g')
  const expenseG = g.append('g')
  const tooltipG = svg.append('g')
    .attr('display', 'none')
    .attr('pointer-events', 'none')
  const tooltipRect = tooltipG.append('rect')
    .attr('rx', 8)
    .attr('stroke', 'white')
    .attr('stroke-width', 3)
  const tooltipText = tooltipG.append('text')
    .attr('font-size', '1.4em')
  const x = d3.scaleBand()
    .domain(['revenue', 'expense'])
    .range([innerWidth / 4, innerWidth * 3 / 4])
    .padding(0.1)
  const y = d3.scaleLinear()
    .range([innerHeight, 0])
  const colors = d3.scaleOrdinal(d3.schemeTableau10)
    .domain(['学杂费', '联邦政府拨款', '州政府拨款', '地方政府拨款', '政府补助、外包合同', '私人礼物、赠款、合同', '投资回报', '资产收入', '教育活动收入', '其他收入', '附属企业收入', '附属医院收入', '独立活动收入', '教学活动', '研究活动', '公共服务', '学术支持', '学生服务', '学院支持', '奖学金支出', '其他支出', '附属企业支出', '附属医院支出', '独立活动支出'])

  draw('all')

  function draw(type) {
    let data,
      core, year = slider.value();
    const dataYear = dataAll.filter(d => d.year == year)[0];
    if (type == 'core') {
      data = {
        year: dataYear.year,
        revenue: Object.create(dataYear.revenue.filter(d => d.core == 1)),
        expense: Object.create(dataYear.expense.filter(d => d.core == 1))
      }
      core = '核心';
    } else {
      data = {
        year: dataYear.year,
        revenue: Object.create(dataYear.revenue),
        expense: Object.create(dataYear.expense)
      }
      core = '总';
    }
    sum = [{
      type: 'revenue',
      ch: year + core + '收入',
      num: d3.sum(data.revenue, d => d.num)
    }, {
      type: 'expense',
      ch: year + core + '支出',
      num: d3.sum(data.expense, d => d.num)
    }]
    sum_p = d3.sum(data.revenue.filter(d => d.num > 0).map(d => d.num))
    const sum_n = d3.sum(data.revenue.filter(d => d.num < 0).map(d => d.num))
    y.domain([sum_n, d3.max([sum[0].num, sum[1].num, sum_p + sum[1].num - sum[0].num, sum_p])])
    g.selectAll('.sumLabelG')
      .data(sum, d => d.ch)
      .join('g')
      .attr('class', 'sumLabelG')
      .attr('transform', d => `translate(${x(d.type)+x.bandwidth()/2},${innerHeight+20})`)
      .append('text')
      .attr('text-anchor', 'middle')
      .text(d => d.ch)
      .append('tspan')
      .attr('x', 0)
      .attr('dy', '1.2em')
      .text(d => d3.format('$.3s')(d.num).replace('G', 'B'))

    if (sum[0].num > sum[1].num) {
      data.expense.push({
        type: '财政结余',
        num: sum[0].num - sum[1].num
      })
    } else if (sum[1].num > sum[0].num) {
      data.revenue.push({
        type: '财政赤字',
        num: sum[1].num - sum[0].num
      })
    }
    let revenue_series_p = {},
      revenue_series_n = {},
      expense_series = {};
    data.revenue.filter(d => d.num > 0).forEach(d => revenue_series_p[d.type] = d.num)
    data.revenue.filter(d => d.num < 0).forEach(d => revenue_series_n[d.type] = d.num)
    data.expense.forEach(d => expense_series[d.type] = d.num)
    revenue_series_p = [revenue_series_p]
    revenue_series_n = [revenue_series_n]
    expense_series = [expense_series]
    const revenue_data_p = d3.stack()
      .keys(data.revenue.filter(d => d.num > 0).map(d => d.type))(revenue_series_p)

    const revenue_data_n = d3.stack()
      .keys(data.revenue.filter(d => d.num < 0).map(d => d.type))(revenue_series_n)

    const expense_data = d3.stack()
      .keys(data.expense.map(d => d.type))(expense_series)

    const revenue_step_p = (y(0) - y.range()[1]) / data.revenue.filter(d => d.num > 0).filter(d => (d.num / sum_p) >= 0.01).length
    const revenue_step_n = (y.range()[0] - y(0)) / data.revenue.filter(d => d.num < 0).length
    const expense_step = innerHeight / data.expense.filter(d => d.num / sum[1].num >= 0.01).length

    revenueG.selectAll('rect')
      .data(revenue_data_p, d => d.key)
      .join(
        enter => enter.append('rect')
        .attr('x', x('revenue'))
        .attr('width', x.bandwidth())
        .attr('y', d => (y(d[0][1]) + y(d[0][0])) / 2)
        .attr('height', 0)
        .attr('fill', d => d.key == '财政赤字' ? 'white' : colors(d.key))
        .attr('stroke-width', d => d.key == '财政赤字' ? 2 : 0)
        .attr('stroke', d => d.key == '财政赤字' ? 'gray' : colors(d.key))
        .attr('stroke-dasharray', d => d.key == '财政赤字' ? '5,5' : '')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .on('mousemove', mousemove),
        update => update,
        exit => exit.remove()
      )
      .transition().duration(500)
      .attr('y', d => y(d[0][1]))
      .attr('height', d => y(d[0][0]) - y(d[0][1]))

    revenueG.selectAll('path')
      .data(revenue_data_p.filter(d => (d[0][1] - d[0][0]) / sum_p >= 0.01), d => d.key)
      .join('path')
      .transition().duration(500)
      .attr('d', (d, i) => `M ${x('revenue')-2},${(y(d[0][0])+y(d[0][1]))/2} L ${innerWidth*3/16+2} ${y(0)-revenue_step_p*i-revenue_step_p/2+5} h -${d.key.length*16}`)
      .attr('stroke', d => d.key == '财政赤字' ? 'gray' : colors(d.key))
      .attr('stroke-width', 2)
      .attr('fill', 'none')
    revenueG.selectAll('text')
      .data(revenue_data_p.filter(d => (d[0][1] - d[0][0]) / sum_p >= 0.01), d => d.key)
      .join(
        enter => enter.append('text')
        .attr('text-anchor', 'end')
        .attr('alignment-baseline', 'bottom')
        .attr('x', innerWidth * 3 / 16)
        .attr('y', (d, i) => y(0) - revenue_step_p * i - revenue_step_p / 2)
        .attr('fill', d => d.key == '财政赤字' ? 'gray' : colors(d.key))
        .text(d => d.key),
        update => update,
        exit => exit.remove()
      ).transition().duration(500)
      .attr('y', (d, i) => y(0) - revenue_step_p * i - revenue_step_p / 2)

    svg.selectAll('defs')
      .data(revenue_data_n, d => d.key)
      .join(
        enter => enter.append('defs')
        .append("pattern")
        .attr('id', d => 'n_pattern_' + d.key)
        .attr('width', 8)
        .attr('height', 8)
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('patternTransform', (d, i) => 'rotate(' + 60 * (d.index + 1) + ')')
        .append("rect")
        .attr('width', 4)
        .attr('height', 8)
        .attr('fill', d => colors(d.key)),
        update => update.selectAll('pattern')
        .attr('patternTransform', (d, i) => 'rotate(' + (-60) * (d.index + 1) + ')')
      )

    revenueNG.selectAll('rect')
      .data(revenue_data_n, d => d.key)
      .join(
        enter => enter.append('rect')
        .attr('x', x('revenue'))
        .attr('width', x.bandwidth())
        .attr('y', d => (y(d[0][1]) + y(d[0][0])) / 2)
        .attr('height', 0)
        .attr('fill', d => 'url(#n_pattern_' + d.key + ')')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .on('mousemove', mousemove),
        update => update,
        exit => exit.remove()
      )
      .transition().duration(500)
      .attr('y', d => y(d[0][0]))
      .attr('height', d => y(d[0][1]) - y(d[0][0]))

    revenueNG.selectAll('path')
      .data(revenue_data_n.filter(d => Math.abs((d[0][0] - d[0][1]) / sum_p) >= 0.01), d => d.key)
      .join('path')
      .attr('stroke', d => d.key == '财政赤字' ? 'gray' : colors(d.key))
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .transition().duration(500)
      .attr('d', (d, i) => `M ${x('revenue')-2},${(y(d[0][0])+y(d[0][1]))/2} L ${innerWidth*3/16+2} ${y(0)+revenue_step_n*i+revenue_step_n/2+5} h -${d.key.length*16}`)
    revenueNG.selectAll('text')
      .data(revenue_data_n.filter(d => Math.abs((d[0][0] - d[0][1]) / sum_p) >= 0.01), d => d.key)
      .join(
        enter => enter.append('text')
        .attr('text-anchor', 'end')
        .attr('alignment-baseline', 'bottom')
        .attr('x', innerWidth * 3 / 16)
        .attr('y', (d, i) => y(0) + revenue_step_n * i + revenue_step_n / 2)
        .attr('fill', d => d.key == '财政赤字' ? 'gray' : colors(d.key))
        .text(d => d.key),
        update => update,
        exit => exit.remove()
      ).transition().duration(500)
      .attr('y', (d, i) => y(0) + revenue_step_n * i + revenue_step_n / 2)

    expenseG.selectAll('rect')
      .data(expense_data, d => d.key)
      .join(
        enter => enter.append('rect')
        .attr('x', x('expense'))
        .attr('y', d => (y(d[0][0]) + y(d[0][1])) / 2 - (y(sum_n) - y(0)))
        .attr('height', 0)
        .attr('width', x.bandwidth())
        .attr('fill', d => d.key == '财政结余' ? 'white' : colors(d.key))
        .attr('stroke-width', d => d.key == '财政结余' ? 2 : 0)
        .attr('stroke', d => d.key == '财政结余' ? 'gray' : colors(d.key))
        .attr('stroke-dasharray', d => d.key == '财政结余' ? '5,5' : '')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .on('mousemove', mousemove),
        update => update,
        exit => exit.remove()
      ).transition().duration(500)
      .attr('y', d => y(d[0][1]) - (y(sum_n) - y(0)))
      .attr('height', d => y(d[0][0]) - y(d[0][1]))

    expenseG.selectAll('path')
      .data(expense_data.filter(d => (d[0][1] - d[0][0]) / sum[1].num >= 0.01), d => d.key)
      .join('path')
      .attr('stroke', d => d.key == '财政结余' ? 'gray' : colors(d.key))
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .transition().duration(500)
      .attr('d', (d, i) => `M ${x('expense')+x.bandwidth()+2},${(y(d[0][0])+y(d[0][1]))/2-(y(sum_n)-y(0))} L ${innerWidth-innerWidth*3/16-2} ${innerHeight-expense_step*i-expense_step/2+5} h ${d.key.length*16}`)
    expenseG.selectAll('text')
      .data(expense_data.filter(d => (d[0][1] - d[0][0]) / sum[1].num >= 0.01), d => d.key)
      .join(
        enter => enter.append('text')
        .attr('alignment-baseline', 'bottom')
        .attr('x', innerWidth - innerWidth * 3 / 16)
        .attr('y', (d, i) => innerHeight - expense_step * i - expense_step / 2)
        .attr('fill', d => d.key == '财政结余' ? 'gray' : colors(d.key))
        .text(d => d.key),
        update => update,
        exit => exit.remove()
      ).transition().duration(500)
      .attr('y', (d, i) => innerHeight - expense_step * i - expense_step / 2)
  }

  function mouseover() {
    tooltipG.attr('display', null)
  }

  function mouseout() {
    tooltipG.attr('display', 'none')
  }

  function mousemove(event, d) {
    const mouse = d3.pointer(event, svg.node())
    const total = d3.pointer(event, g.node())[0] < x('expense') ? sum_p : sum[1].num
    let selectedData, selectedLevel, tooltipX, tooltipY
    tooltipText.text(d.key)
      .attr('fill', d.key == '财政结余' || d.key == '财政赤字' ? 'gray' : 'white')
    tooltipText.append('tspan')
      .attr('x', 0)
      .attr('dy', '1.2em')
      .text('$' + d3.format('.3s')(d[0].data[d.key]).replace('G', 'B') + (d.key == '财政结余' || d.key == '财政赤字' ? '' : ('（' + d3.format('.1%')(d[0].data[d.key] / total) + '）')))

    const tooltipBox = tooltipText.node().getBBox();
    tooltipRect.attr('x', tooltipBox.x - 10)
      .attr('y', tooltipBox.y - 5)
      .attr('width', tooltipBox.width + 20)
      .attr('height', tooltipBox.height + 10)
      .attr('fill', (d[0][1] - d[0][0]) > 0 ? d3.select(this).attr('fill') : colors(d.key))
      .attr('stroke-dasharray', d.key == '财政赤字' || d.key == '财政结余' ? '5,5' : '')
      .attr('stroke', d.key == '财政赤字' || d.key == '财政结余' ? 'gray' : 'white')
    if (mouse[0] + tooltipBox.width > width - margin.right) {
      tooltipX = mouse[0] - tooltipBox.width - 20
    } else {
      tooltipX = mouse[0] + 25
    }
    if (mouse[1] + tooltipBox.height > height - margin.bottom) {
      tooltipY = mouse[1] - tooltipBox.height + 20
    } else {
      tooltipY = mouse[1] + 30
    }
    tooltipG.attr('transform', `translate(${tooltipX},${tooltipY})`)
  }
})
};
jQuery('#finance_modal').on('shown.bs.modal', finance_modal_create2);

function finance_modal_create2() {
    finance_modal_create();
    jQuery('#finance_modal').off('shown.bs.modal', finance_modal_create2);
}
}
catch( err ) { console.log( err ); }
try {
salary_modal_create = function() {
  Promise.all([d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/staff_salary_20240118.php?name='+ location.pathname.substring(1) + location.search.replace("?", "&")), d3.json('https://www.forwardpathway.com/d3v7/dataphp/school_database/staff_salary_average.php')]).then(([dataAll, avgData]) => {
  const width = 900;
  const height = 600;
  const margin = {
    top: 10,
    bottom: 100,
    left: 80,
    right: 60
  };
  const ranks = {
    1: '教授',
    2: '副教授',
    3: '助理教授',
    4: '讲师 (Instructor)',
    5: '讲师 (Lecturer)',
    6: '无职称',
    7: '所有教职工'
  }
  const salaryFormat = d => d > 0 ? d3.format('$,')(d) : '-'
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const svg = d3.select("#salary_canvas").append('svg')
    .attr("viewBox", [0, 0, width, height]);
  svg.append('rect').attr('height', '100%').attr('width', '100%')
    .attr('fill', 'url(#watermark)').attr('opacity', 0.05)
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  const slider = d3.sliderBottom();
  const years = dataAll.map(d => d.year);
  slider
    .min(d3.min(years))
    .max(d3.max(years))
    .marks(years)
    .default(d3.max(years))
    .width(width * 0.7)
    .tickFormat(d3.format(""))
    .tickValues(years)
    .on("onchange", () => {
      draw();
    });
  const sliderG = svg.append('g')
    .attr('transform', `translate(${width*0.15},${innerHeight+margin.top+50})`)
    .call(slider);
  const xScale = d3.scaleBand().range([0, innerWidth])
    .padding(0.2)
  const xAxis = d3.axisBottom(xScale)
  const xAxisG = g.append('g')
    .attr('transform', `translate(0,${innerHeight})`)
  const yScale = d3.scaleLinear().range([innerHeight, 0])
  const yAxisG = g.append('g');
  const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .ticks(5)
    .tickFormat(d3.format('$~s'))
  const yAxisLabelText = yAxisG
    .append('text')
    .attr('class', 'axis-label')
    .attr('y', -55)
    .attr('x', -innerHeight / 2)
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('年薪')
  const backRect = g.append('rect')
    .attr('fill', 'lightgray')
    .attr('height', innerHeight)
    .attr('display', 'none')
  const types = [{
    name: '男教职工',
    color: '#6eacd6'
  }, {
    name: '女教职工',
    color: '#f78085'
  }, {
    name: '所有教职工',
    color: '#05cbae'
  }]
  let legendText = '',
    legendStyle = '',
    legendRectWidth = 16;
  types.forEach(function(s, index) {
    legendText = legendText + `<span class="staff-salary-${index}">${s.name}</span>`;
    legendStyle = legendStyle + `.staff-salary-${index}{display:inline-flex;align-items:center;margin-right:1em;}.staff-salary-${index}::before{content:"";width:${legendRectWidth}px;height:${legendRectWidth}px;margin-right:0.5em;background:${s.color};}`
  })
  d3.select('#salary_legend_canvas').html('<style>' + legendStyle + '</style><div>' + legendText + '</div>')

  const tooltip = svg.append('g')
    .attr('class', 'tooltip-wrapper')
    .attr('display', 'none');
  const tooltipRect = tooltip.append('rect')
    .attr('fill', '#6eacd6')
    .attr('rx', 15)
    .attr('stroke-width', 2).attr('stroke', 'white');
  const tooltipText = tooltip.append('text');
  const focusA = svg.append('a')
  const focus = focusA.append('rect').attr('class', 'focusRect')
    .attr('transform', `translate(${margin.left},${margin.top})`)
    .attr('cursor', 'pointer')
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .attr('width', innerWidth)
    .attr('height', innerHeight)

  draw();

  function draw() {
    const year = slider.value();
    const data = dataAll.filter(d => d.year == year)[0].data
    const avgNum = avgData.filter(d => d.year == year)[0].avg
    //const avgData = [{
    //  year: slider.value(),
    //  avg: avgNum
    //}]
    xScale
      .domain(data.map(d => ranks[d.r]))
    xAxisG.call(xAxis);
    xAxisG.select('.domain').remove();
    yScale
      .domain([0, d3.max(data.map(d => +d.m).concat(data.map(d => +d.w), avgNum))]).nice();
    yAxisG.call(yAxis);
    yAxisG.select('.domain').remove();
    backRect.attr('width', xScale.step())
      .attr('x', xScale.step() * xScale.padding() / 2)
    const typeMargin = 0.1 * xScale.bandwidth() / 3;
    const salary_m = g.selectAll('.salary_m')
      .data(data)
      .join('rect').attr('class', 'salary_m')
      .attr('fill', '#6eacd6')
      .attr('x', d => xScale(ranks[d.r]) + typeMargin / 2)
      .attr('y', d => yScale(d.m))
      .attr('height', d => yScale(0) - yScale(d.m))
      .attr('width', d => xScale.bandwidth() / 3 - typeMargin)
    const salary_w = g
      .selectAll('.salary_w')
      .data(data)
      .join('rect').attr('class', 'salary_w')
      .attr('fill', '#f78085')
      .attr('x', d => xScale(ranks[d.r]) + xScale.bandwidth() / 3 + typeMargin / 2)
      .attr('y', d => yScale(d.w))
      .attr('height', d => yScale(0) - yScale(d.w))
      .attr('width', d => xScale.bandwidth() / 3 - typeMargin)
    const salary_t = g
      .selectAll('.salary_t')
      .data(data)
      .join('rect').attr('class', 'salary_t')
      .attr('fill', '#05cbae')
      .attr('x', d => xScale(ranks[d.r]) + xScale.bandwidth() * 2 / 3 + typeMargin / 2)
      .attr('y', d => yScale(d.t))
      .attr('height', d => yScale(0) - yScale(d.t))
      .attr('width', d => xScale.bandwidth() / 3 - typeMargin)
    const salary_avg = g.selectAll('.salary_avg')
      .data(avgData.filter(d => d.year == year), d => d.year)
      .join(
        function(enter) {
          const enterG = enter.append('g')
            .attr('class', 'salary_avg')
          enterG.append('path')
            .attr('d', d => `M 0 ${yScale(d.avg)} H ${innerWidth-15}`)
            .attr('stroke', 'gray')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '2 5')
            .attr('fill', 'none')
          enterG.append('text')
            .attr('font-size', 12)
            .attr('transform', d => `translate(${innerWidth+20},${yScale(d.avg)-4})`)
            .attr('text-anchor', 'middle')
            .text('Top200大学')
            .append('tspan')
            .attr('x', 0)
            .attr('dy', '1em')
            .text('平均年薪')
          const enterRect = enterG.append('rect')
          const enterText = enterG.append('text')
            .attr('font-size', 12)
            .attr('x', 0)
            .attr('y', d => yScale(d.avg) + 3)
            .attr('text-anchor', 'end')
            .attr('fill', 'white')
            .text(d => d3.format('$,')((d.avg)))
          const enterTextBox = enterText.node().getBBox();
          enterRect.attr('x', enterTextBox.x - 2.5)
            .attr('y', enterTextBox.y - 5)
            .attr('width', enterTextBox.width + 5)
            .attr('height', enterTextBox.height + 10)
            .attr('fill', 'black')
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('rx', 5)
        }
      )
    focus.on('mousemove', focusMouseMove)
      .on('mouseover', focusMouseOver)
      .on('mouseout', focusMouseOut)

    function focusMouseMove(event) {
      const mouse = d3.pointer(event);
      let catIndex = Math.round((mouse[0] - xScale.step() * (0.5 + xScale.padding() / 2)) / xScale.step());
      if (catIndex < 0) {
        catIndex = 0;
      }
      if (catIndex > data.length - 1) {
        catIndex = data.length - 1;
      }
      backRect.attr('x', xScale.step() * catIndex + xScale.step() * xScale.padding() / 2)
      const focusedData = data[catIndex];
      const background = '#05cbae';
      tooltipText.text(year + '年')
        .append('tspan').attr('x', 0).attr('dy', '1.2em')
        .text(ranks[focusedData.r] + '平均年薪：' + salaryFormat(focusedData.t))
        .append('tspan').attr('x', 0).attr('dy', '1.2em')
        .text('男' + ranks[focusedData.r] + '：' + salaryFormat(focusedData.m))
        .append('tspan').attr('x', 0).attr('dy', '1.2em')
        .text('女' + ranks[focusedData.r] + '：' + salaryFormat(focusedData.w))
      const tooltipBox = tooltipText.node().getBBox();
      tooltipRect.attr('x', tooltipBox.x - 10)
        .attr('y', tooltipBox.y - 10)
        .attr('width', tooltipBox.width + 20)
        .attr('height', tooltipBox.height + 20)
      let tooltipX = mouse[0] + margin.left;
      let tooltipY = mouse[1] + margin.top - tooltipBox.height;
      tooltipX = tooltipBox.width + tooltipX > width - margin.right ? width - margin.right - tooltipBox.width : tooltipX;
      tooltipY = tooltipY < margin.top ? margin.top : tooltipY;
      tooltip.attr('transform', `translate(${tooltipX},${tooltipY})`);
    }

    function focusMouseOver(event, d) {
      tooltip.attr('display', null)
        .attr('transform', `translate(${d3.pointer(event)[0]},${d3.pointer(event)[1]})`);
      backRect.attr('display', null)

    }

    function focusMouseOut() {
      tooltip.attr('display', 'none')
      backRect.attr('display', 'none')
    }
  }

})
};
jQuery('#salary_modal').on('shown.bs.modal', salary_modal_create2);

function salary_modal_create2() {
    salary_modal_create();
    jQuery('#salary_modal').off('shown.bs.modal', salary_modal_create2);
}
}
catch( err ) { console.log( err ); }    </script>