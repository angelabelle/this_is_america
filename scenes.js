function intro() {

    this.setup = function() {
        flowerGroup = new Group();
        for (var i = 1; i <= flowerAmount; i++) {
            random(width);
            var newSprite = createSprite(random(width), random(height));
            //compact way to add an image
            newSprite.addImage(loadImage(type[i % 3]));
            flowerGroup.add(newSprite);
        }
        bulletIcon = createSprite(width / 2, 0);
        bulletIcon.addImage(loadImage('images/bulletSmall.png'));
        bulletIcon.rotateToDirection = true;
        bulletIcon.maxSpeed = 6;
        bulletIcon.friction = .06;
    }

    this.enter = function() {
        noCursor();
        console.log("LANDING PAGE");
        let millisecond;
        if (yearSlider && sel1 && sel2) {
            yearSlider.hide();
            sel1.hide();
            sel2.hide();
        }
        if (millisecond == 1000) {
            mgr.showScene(main);
        }
        document.getElementById("top").style.display = "none";
        document.getElementById("bottom").innerHTML = "";

    }

    this.draw = function() {
        millisecond = millis();
        textSize(120);
        textAlign(CENTER);
        text("THIS IS AMERICA", windowWidth / 2, windowHeight / 2);
        textSize(10);
        textAlign(CENTER);
        text("PRESS 2", windowWidth / 2, (windowHeight / 2) + 60);

        if (mouseIsPressed) {
            bulletIcon.attractionPoint(1, mouseX, mouseY);
        }

        bulletIcon.displace(flowerGroup);
        drawSprites();
    }


}


function help() {

    this.setup = function() {
        cursor();
    }
    this.enter = function() {
        console.log("HELP PAGE");
        if (yearSlider && sel1 && sel2) {
            yearSlider.hide();
            sel1.hide();
            sel2.hide();
        }
        document.getElementById("top").style.display = "block";
        document.getElementById("top").innerHTML = "HELP PAGE!";
        document.getElementById("bottom").innerHTML = "<h3>Helpful information about guns: </h3> <a href = 'https://www.nraila.org/gun-laws/'>US Gun Policy<a><br><a href = 'https://www.cfr.org/backgrounder/us-gun-policy-global-comparisons'>Gun Policies with Global Comparison</a><br><a href = 'https://www.gunviolencearchive.org/'>Gun Violence Data</a><br><a href = 'https://lawcenter.giffords.org/facts/gun-violence-statistics/'>Gun Violence Statitistics</a>";



    }
    this.draw = function() {
        imageMode(CENTER);
        image(blueHydrangea, width / 6, 50, 100, 100);
        textSize(20);
        textAlign(CORNER);
        text("represent ten or more deaths.", width / 3, 50);
        image(whiteLillies, width / 6, 150, 100, 100);
        text("represent five to ten deaths.", width / 3, 150);
        image(pinkCarnation, width / 6, 250, 100, 100);
        text("represent less than five deaths.", width / 3, 250);
        text("Size varies depending on the amount within the range", width - 300, 50);
    }
}

function main() {

    var ranX1 = [];
    var ranY1 = [];
    var ranX2 = [];
    var ranY2 = [];
    var mapX1, mapX2;
    var dropBullet;
    // let sel1, sel2;
    let selectState1 = 'Select State';
    let selectState2 = 'Select State';
    // let yearSlider;
    let sliderVal;
    let button;

    this.setup = function() {
        dropDown1();
        dropDown2();
        slider();
    }

    this.enter = function() {
        console.log("im in the main scene");
        document.getElementById("top").innerHTML = "1997-2019";
        document.getElementById("bottom").innerHTML = "";
        yearSlider.show();
        sel1.show();
        sel2.show();
        document.getElementById("top").style.display = "block";
        cursor();
        randomizedMap1(0, windowWidth / 2);
        randomizedMap2(windowWidth / 2, windowWidth);
        button = createButton('?');
        button.position(19, 19);
        button.mousePressed(nextScene);

    }
    this.draw = function() {
        background(255);
        for (var i = 0; i < ms.msUS.length; i++) {
            update1(ms.msUS[i], ranX1[i], ranY1[i]);
            update2(ms.msUS[i], ranX2[i], ranY2[i]);
        }
        // if(dropBullet == true)
        // {
        //     drawSprites(bulletGroup);
        // }


        // textSize(100);
        // text(sliderVal, windowWidth/2, windowHeight/2);

    }
    this.mousePressed = function() {
        if (mouseIsPressed) {
            return true;
        }
    }

    function randomizedMap1(mapX1, mapX2) {

        for (var i = 0; i < ms.msUS.length; i++) {
            ranX1[i] = random(mapX1, mapX2);
            ranY1[i] = random(0, windowHeight - (windowHeight / 4));
        }
    }

    function randomizedMap2(mapX1, mapX2) {

        for (var i = 0; i < ms.msUS.length; i++) {
            ranX2[i] = random(mapX1, mapX2);
            ranY2[i] = random(0, windowHeight - (windowHeight / 4));
        }
    }

    function update1(obj, ranX, ranY) {
        push();
        visualize1(obj, ranX, ranY);
        pop();
    }

    function update2(obj, ranX, ranY) {
        push();
        visualize2(obj, ranX, ranY);
        pop();
    }


    function visualize1(obj, ranX, ranY) {
        imageMode(CENTER);
        obj.x = ranX;
        obj.y = ranY;
        var size;
        var year = obj.fields.date;
        year = year.substr(0, 4);
        var fatal = obj.fields.total_number_of_fatalities;
        var state = obj.fields.state;
        var description = obj.fields.description;
        var gun = obj.fields.type_of_gun_general.toLowerCase();
        noStroke();
        push();

        if (selectState1 == 'Select State' && !sliderVal) {
            obj.x = map(obj.x, 0, width / 2, 0, width);
            if (obj.fields.total_number_of_fatalities >= 10) {
                size = (5 * fatal) + 10;
                // image(bullet, obj.x, obj.y, size/2, size/2);

                image(blueHydrangea, obj.x, obj.y, size, size);

            } else if (obj.fields.total_number_of_fatalities >= 5) {
                // size = (2 * fatal) + 10;

                size = (16 * fatal) + 10;
                // image(bullet, obj.x, obj.y, size/2, size/2);
                image(whiteLillies, obj.x, obj.y, size, size);

            } else {
                size = (5 * fatal) + 10;
                // image(bullet, obj.x, obj.y, size/2, size/2);
                image(pinkCarnation, obj.x, obj.y, size, size);
            }
            // showText(obj, obj.x, obj.y, size, description);
            showGun(obj, obj.x, obj.y, size, gun);
            pop();

        } else if (selectState1 == 'Select State' && year == sliderVal) {

            if (obj.fields.total_number_of_fatalities >= 10) {
                size = (5 * fatal) + 10;
                // image(bullet, obj.x, obj.y, size/2, size/2);

                image(blueHydrangea, obj.x, obj.y, size, size);


            } else if (obj.fields.total_number_of_fatalities >= 5) {
                // size = (2 * fatal) + 10;

                size = (16 * fatal) + 10;
                // image(bullet, obj.x, obj.y, size/2, size/2);
                image(whiteLillies, obj.x, obj.y, size, size);

            } else {
                size = (5 * fatal) + 10;
                // image(bullet, obj.x, obj.y, size/2, size/2);
                image(pinkCarnation, obj.x, obj.y, size, size);
            }
            // showText(obj, obj.x, obj.y, size, description);
            showGun(obj, obj.x, obj.y, size, gun);
            pop();
        } else if (state == selectState1 && year == sliderVal) {
            push();

            if (obj.fields.total_number_of_fatalities >= 10) {
                size = (5 * fatal) + 10;
                image(blueHydrangea, obj.x, obj.y, size, size);
            } else if (obj.fields.total_number_of_fatalities >= 5) {
                // size = (2 * fatal) + 10;
                // image(bullet, obj.x, obj.y, size, size);
                size = (16 * fatal) + 10;
                image(whiteLillies, obj.x, obj.y, size, size);
            } else {
                size = (5 * fatal) + 10;
                image(pinkCarnation, obj.x, obj.y, size, size);
            }
            showGun(obj, obj.x, obj.y, size, gun);
            showText(obj, obj.x, obj.y, size, description);
            pop();
        }
    }

    function visualize2(obj, ranX, ranY) {
        imageMode(CENTER);
        //  console.log(obj.posX[s]);

        obj.x = ranX;
        obj.y = ranY;
        var size;
        var year = obj.fields.date;
        year = year.substr(0, 4);
        var fatal = obj.fields.total_number_of_fatalities;
        var state = obj.fields.state;
        var description = obj.fields.description;
        var gun = obj.fields.type_of_gun_general.toLowerCase();
        noStroke();
        push();
        if (selectState2 == 'Select State' && !sliderVal) {


        } else if (selectState2 == 'Select State' && year == sliderVal) {

            if (obj.fields.total_number_of_fatalities >= 10) {
                size = (5 * fatal) + 10;
                image(blueHydrangea, obj.x, obj.y, size, size);
            } else if (obj.fields.total_number_of_fatalities >= 5) {
                // size = (2 * fatal) + 10;
                // image(bullet, obj.x, obj.y, size, size);
                size = (16 * fatal) + 10;
                image(whiteLillies, obj.x, obj.y, size, size);
            } else {
                size = (5 * fatal) + 10;
                image(pinkCarnation, obj.x, obj.y, size, size);
            }
            // showText(obj, obj.x, obj.y, size, description);
            showGun(obj, obj.x, obj.y, size, gun);
            pop();
        } else if (state == selectState2 && year == sliderVal) {
            push();

            if (obj.fields.total_number_of_fatalities >= 10) {
                size = (5 * fatal) + 10;
                image(blueHydrangea, obj.x, obj.y, size, size);
            } else if (obj.fields.total_number_of_fatalities >= 5) {
                // size = (2 * fatal) + 10;
                // image(bullet, obj.x, obj.y, size, size);
                size = (16 * fatal) + 10;
                image(whiteLillies, obj.x, obj.y, size, size);
            } else {
                size = (5 * fatal) + 10;
                image(pinkCarnation, obj.x, obj.y, size, size);
            }
            showGun(obj, obj.x, obj.y, size, gun);
            showText(obj, obj.x, obj.y, size, description);
            // dropBullets(obj, obj.x, obj.y, size, fatal);
            pop();
        }

    }


    function slider() {
        yearSlider = createSlider(1997, 2019, 0, 1);
        yearSlider.position(width / 4, 90);
        yearSlider.style('width', '50%');
        yearSlider.changed(mySelectEvent);
        // yearSlider.style('height', '600px');


    }

    function showText(obj, x, y, size, description) {
        var descriptions = [];
        var field = size / 4;
        if ((mouseX >= x - field) && (mouseX <= x + field) && (mouseY >= y - field) && (mouseY <= y + field)) {

            descriptions.push(description);
            if (descriptions.length > 1) {
                descriptions.splice(0, 1);
            } else {
                fill(0);
                textSize(20);
                text(descriptions[0], windowWidth / 2, windowHeight - (windowHeight / 6), width, 200);
            }

        } else {
            descriptions = [];
        }

    }


    // function dropBullets(obj, x, y, size, fatal) {
    //     var field = size / 4;
    //
    //         if (mouseIsPressed == true) {
    //
    //                 if ((mouseX >= x - field) && (mouseX <= x + field) && (mouseY >= y - field) && (mouseY <= y + field)) {
    //                     bulletGroup = new Group();
    //                         for (var i = 0; i <= fatal; i++)
    //                         {
    //                             var bulletSprite = createSprite(x, y);
    //                   //compact way to add an image
    //                             bulletSprite.addImage(loadImage('../../../images/bulletSmall.png'));
    //                             bulletGroup.add(bulletSprite);
    //                         }
    //                         dropBullet = true;
    //         }
    //
    //     }
    //     else {
    //         dropBullet = false;
    //     }

    // }

    function showGun(obj, x, y, size, gun) {
        var field = size / 4;
        var picSize = windowWidth / 4;
        if (mouseIsPressed == true) {
            if ((mouseX >= x - field) && (mouseX <= x + field) && (mouseY >= y - field) && (mouseY <= y + field)) {
                transparency = true;
                if (gun == "shotgun") {
                    image(shotgunImage, windowWidth / 2, (windowHeight / 2) - picSize / 2, picSize + 200, picSize);
                } else if (gun == "handgun") {
                    image(handgunImage, windowWidth / 2, (windowHeight / 2) - picSize / 2, picSize + 100, picSize);
                } else if (gun == "rifle") {
                    image(rifleImage, windowWidth / 2, (windowHeight / 2) - picSize / 2, picSize + 400, picSize);
                }
            }
        }

        transparency = false;
    }

    function dropDown1() {
        textAlign(CENTER);
        background(200);
        sel1 = createSelect();
        sel1.style('appearance', 'none');
        sel1.style('outline', 'none');
        sel1.style('background-image', 'none');
        sel1.style('background-color', '#fff');
        sel1.style('color', '#000');
        if (windowWidth <= 600) {
            sel1.position(windowWidth / 2 - 40, 140);
        } else {
            sel1.position(0 + windowWidth / 4, 70);
        }

        sel1.option('Select State');
        sel1.option('Alabama');
        sel1.option('Alaska');
        sel1.option('Arizona');
        sel1.option('Arkansas');
        sel1.option('California');
        sel1.option('Colorado');
        sel1.option('Connecticut');
        sel1.option('Delaware');
        sel1.option('District Of Columbia');
        sel1.option('Florida');
        sel1.option('Georgia');
        sel1.option('Hawaii');
        sel1.option('Idaho');
        sel1.option('Illinois');
        sel1.option('Indiana');
        sel1.option('Iowa');
        sel1.option('Kansas');
        sel1.option('Kentucky');
        sel1.option('Louisiana');
        sel1.option('Maine');
        sel1.option('Maryland');
        sel1.option('Massachusetts');
        sel1.option('Michigan');
        sel1.option('Minnesota');
        sel1.option('Mississippi');
        sel1.option('Missouri');
        sel1.option('Montana');
        sel1.option('Nebraska');
        sel1.option('Nevada');
        sel1.option('New Hampshire');
        sel1.option('New Jersey');
        sel1.option('New Mexico');
        sel1.option('New York');
        sel1.option('North Carolina');
        sel1.option('North Dakota');
        sel1.option('Ohio');
        sel1.option('Oklahoma');
        sel1.option('Oregon');
        sel1.option('Pennsylvania');
        sel1.option('Rhode Island');
        sel1.option('South Carolina');
        sel1.option('South Dakota');
        sel1.option('Tennessee');
        sel1.option('Texas');
        sel1.option('Utah');
        sel1.option('Vermont');
        sel1.option('Virginia');
        sel1.option('Washington');
        sel1.option('West Virginia');
        sel1.option('Wisconsin');
        sel1.option('Wyoming');
        sel1.changed(mySelectEvent);
    }

    function dropDown2() {
        textAlign(CENTER);
        background(200);
        sel2 = createSelect();
        sel2.style('appearance', 'none');
        sel2.style('outline', 'none');
        sel2.style('background-image', 'none');
        sel2.style('background-color', '#fff');
        sel2.style('color', '#000');
        if (windowWidth <= 600) {
            sel2.position(windowWidth / 2, 140);
        } else {
            sel2.position(windowWidth - (windowWidth / 4 + 120), 70);
        }

        sel2.option('Select State');
        sel2.option('Alabama');
        sel2.option('Alaska');
        sel2.option('Arizona');
        sel2.option('Arkansas');
        sel2.option('California');
        sel2.option('Colorado');
        sel2.option('Connecticut');
        sel2.option('Delaware');
        sel2.option('District Of Columbia');
        sel2.option('Florida');
        sel2.option('Georgia');
        sel2.option('Hawaii');
        sel2.option('Idaho');
        sel2.option('Illinois');
        sel2.option('Indiana');
        sel2.option('Iowa');
        sel2.option('Kansas');
        sel2.option('Kentucky');
        sel2.option('Louisiana');
        sel2.option('Maine');
        sel2.option('Maryland');
        sel2.option('Massachusetts');
        sel2.option('Michigan');
        sel2.option('Minnesota');
        sel2.option('Mississippi');
        sel2.option('Missouri');
        sel2.option('Montana');
        sel2.option('Nebraska');
        sel2.option('Nevada');
        sel2.option('New Hampshire');
        sel2.option('New Jersey');
        sel2.option('New Mexico');
        sel2.option('New York');
        sel2.option('North Carolina');
        sel2.option('North Dakota');
        sel2.option('Ohio');
        sel2.option('Oklahoma');
        sel2.option('Oregon');
        sel2.option('Pennsylvania');
        sel2.option('Rhode Island');
        sel2.option('South Carolina');
        sel2.option('South Dakota');
        sel2.option('Tennessee');
        sel2.option('Texas');
        sel2.option('Utah');
        sel2.option('Vermont');
        sel2.option('Virginia');
        sel2.option('Washington');
        sel2.option('West Virginia');
        sel2.option('Wisconsin');
        sel2.option('Wyoming');
        sel2.changed(mySelectEvent);
    }

    function mySelectEvent() {
        selectState1 = sel1.value();
        sliderVal = yearSlider.value();
        selectState2 = sel2.value();
        console.log(sliderVal + "val1");
        document.getElementById("top").innerHTML = "IN " + sliderVal;
    }
}
