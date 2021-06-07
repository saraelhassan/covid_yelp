// variables to use for later
var oneFiveStar = 0;
var twoStar = 0;
var twoFiveStar = 0;
var threeStar = 0;
var threeFiveStar = 0;
var fourStar = 0;
var fourFiveStar = 0;
var fiveStar = 0;

var r_oneFiveStar = 0;
var r_twoStar = 0;
var r_twoFiveStar = 0;
var r_threeStar = 0;
var r_threeFiveStar = 0;
var r_fourStar = 0;
var r_fourFiveStar = 0;
var r_fiveStar = 0;
var distinctStars = [];

function getStuff() {
    d3.json("nc_sample.json").then((sampledata) => {
        //console.log(sampledata)
        var stars = Object.values(sampledata.stars);
        //console.log(stars)

        // variables to hold the data
        var reviewCounts = Object.values(sampledata.review_count);
        var names = Object.values(sampledata.name);
        var grubhubs = Object.values(sampledata.grubhub_enabled);
        var cities = Object.values(sampledata.city);
        var address = Object.values(sampledata.address);
        var lat = Object.values(sampledata.latitude);
        var lng = Object.values(sampledata.longitude);
        var covidBanner = Object.values(sampledata.covid_banner);
        var deliveryTakeout = Object.values(sampledata.delivery_or_takeout);

        // loop to create array of unique star ratings
        for (var i = 0; i < stars.length; i++) {
            if (!distinctStars.includes(stars[i])){
            distinctStars.push(stars[i]);
        }}
        //console.log(distinctStars);

        // loop to count the number of star ratings per star category
        for(var i = 0; i < stars.length; i++) {
            //console.log(stars[i])
            switch(stars[i]) {
                case 1.5:
                    oneFiveStar++;
                    break;
                case 2.5:
                    twoFiveStar++;
                    break;
                case 3.5:
                    threeFiveStar++;
                    break;
                case 4.5:
                    fourFiveStar++;
                    break;
                case 5:
                    fiveStar++;
                    break;
                case 3:
                    threeStar++;
                    break;
                case 2:
                    twoStar++;
                    break;
                case 4:
                    fourStar++;
                    break;

            }
        }
        //console.log(threeStar)

        // loop for aggregating the number of reviews for each star rating
        for(var i = 0; i < stars.length; i++) {
            
            switch(stars[i]) {
                case 1.5:
                    r_oneFiveStar = r_oneFiveStar + reviewCounts[i];
                    break;
                case 2.5:
                    r_twoFiveStar = r_twoFiveStar + reviewCounts[i];
                    break;
                case 3.5:
                    r_threeFiveStar = r_threeFiveStar + reviewCounts[i];
                    break;
                case 4.5:
                    r_fourFiveStar = r_fourFiveStar + reviewCounts[i];
                    break;
                case 5:
                    r_fiveStar = r_fiveStar + reviewCounts[i];
                    break;
                case 3:
                    r_threeStar = r_threeStar + reviewCounts[i];
                    break;
                case 2:
                    r_twoStar = r_twoStar + reviewCounts[i];
                    break;
                case 4:
                    r_fourStar = r_fourStar + reviewCounts[i];
                    break;

            }
        }
        
        // charts
        var ctx = document.getElementById("myBarChart");
        var ctx1 = document.getElementById("myPieChart");

        // sorted away ascending
        const sortedStars = distinctStars.slice().sort();
        //console.log(sortedStars)

        //console.log([oneFiveStar, twoStar, twoFiveStar, threeStar, threeFiveStar, fourStar, fourFiveStar, fiveStar])

        var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedStars,
            datasets: [
                {
                    label: "Count of each star category",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#00FF3C", "#EAC112","#696969"],
                    data: [oneFiveStar, twoStar, twoFiveStar, threeStar, threeFiveStar, fourStar, fourFiveStar, fiveStar]
                }
            ]
        }
        });

        

        var myPieChart = new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: sortedStars,
                datasets: [
                    {
                        label: "Sum of reviews for each star rating",
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#00FF3C", "#EAC112","#696969"],
                        data: [r_oneFiveStar, r_twoStar, r_twoFiveStar, r_threeStar, r_threeFiveStar, r_fourStar, r_fourFiveStar, r_fiveStar]
                    }
                ]
            }
        });
    }); 
}




// call the function
getStuff();




