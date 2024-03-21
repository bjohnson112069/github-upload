
function draw() {
          const map = document.querySelector(".map");
          const canvas = document.querySelector("#canvas");
          const ctx = canvas.getContext("2d");
          const title = document.querySelector(".title");
          const topics = document.querySelectorAll(".topic");
          const subtopics = document.querySelectorAll(".sub-topic");

          // store the coordinates for the title element
          let x1 = Math.round(title.offsetLeft + (title.offsetWidth / 2));
          let y1 = Math.round(title.offsetTop + (title.offsetHeight / 2));

          // Make the canvas visually fill the positioned parent
          canvas.style.width ='100%';
          canvas.style.height='100%';
          
          // ...then set the internal size to match
          canvas.width  = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;

          // set the line width and line style for the context
          ctx.lineWidth = 3;
          ctx.setLineDash([5, 5]);

          function drawCurve(x1, y1, x2, y2, color) {
                    // set the stroke color of the pen
                    ctx.strokeStyle = color;

                    // put the pen down
                    ctx.beginPath();
                    
                    // move the root element (i.e. title or topic)
                    ctx.moveTo(x1, y1);

                    // calculate the delta between the horizontal coordinates
                    const dx = x2 - x1;

                    //  bezier control points are 25% and 75% along the horizontal axis ...
                    // and the height of the element we are drawing to on the vertical axis (e.g. y2)
                    const pt1 = dx * .25;
                    const pt2 = dx * .75;

                    ctx.bezierCurveTo((x1 + pt1), y2, (x1 + pt2), y2, x2, y2);
                    ctx.stroke();
          }

          // iterate through all the topics and draw curves from the title to each topic
          topics.forEach(topic => {

                    // calculate the mid-point of the topic element.  *Coordinates are relative to the viewport
                    const x2 = Math.round(topic.offsetLeft + (topic.offsetWidth / 2));
                    const y2 = Math.round(topic.offsetTop + (topic.offsetHeight / 2));

                    drawCurve(x1, y1, x2, y2, `${window.getComputedStyle(topic).backgroundColor}`)
          })


          const topic = document.querySelector(`.topic[data-value="4"]`);
          // store the coordinates for the (4th/Focus) topic element
          x1 = Math.round(topic.offsetLeft + (topic.offsetWidth / 2));
          y1 = Math.round(topic.offsetTop + (topic.offsetHeight / 2));

          // iterate through all the subtopics and draw curves from the topic to each subtopic
          subtopics.forEach(subtopic => {
                    // ctx.strokeStyle = `${window.getComputedStyle(subtopic).borderColor}`;

                    // calculate the mid-point of the subtopic element.  *Coordinates are relative to the topic
                    const x2 = topic.offsetLeft + Math.round(subtopic.offsetLeft + (subtopic.offsetWidth / 2));
                    const y2 = topic.offsetTop + Math.round(subtopic.offsetTop + (subtopic.offsetHeight / 2));

                    drawCurve(x1, y1, x2, y2, `${window.getComputedStyle(subtopic).borderColor}`)
          })
}

draw();
window.addEventListener("resize", draw);