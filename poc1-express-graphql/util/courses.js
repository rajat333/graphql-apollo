const { coursesData } = require('../config/config');

const getCourse = function(args) { 
    console.log('getCourse  args-------', args);
    console.log('coursesData ', coursesData);
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
};

const getCourses = function(args) {
    console.log('getCourses  args-------', args);
    console.log('coursesData ', coursesData);
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
};

var updateCourseTopic = function({id, topic}) {
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    console.log('##################', coursesData);
    return coursesData.filter(course => course.id === id) [0];
};

module.exports = { getCourse, getCourses, updateCourseTopic };
