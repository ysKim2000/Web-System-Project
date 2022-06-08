module.exports = { ReserveSystem };
const { Soccer } = require('./System/soccer.js');
const { Movie } = require('./System/movie.js');
const { Opera } = require('./System/opera.js');
const { Baseball } = require('./System/baseball.js');
const CustomerPoint = require('./points.js').CustomerPoint;
const Customer = require('./points.js').Customer;
// const Show = require('./show.js').Show;

function ReserveSystem(type, name) {
    this.type = type;
    this.name = name;
    this.seat = function(){
        
    };
};

ReserveSystem.prototype.getPoint = Customer.prototype.getPoint;
ReserveSystem.prototype.getTotalPrice = Customer.prototype.getTotalPrice;
ReserveSystem.prototype.register = Customer.prototype.register;
// ReserveSystem.prototype.selectShow = Show.prototype.selectShow;
// ReserveSystem.prototype.totalPrice = 0;
const customerPoint = new CustomerPoint();

// Currying function
const plus = (a, b, c) => a + b + c;
const sumPrice = (x) => (y) => (z) => plus(x, y, z);

// Strategy Pattern
const Course = (function () {
    function Course() {
        this.course = null;
    };
    Course.prototype.setCourse = function (course) {
        this.course = course;
    };
    Course.prototype.execute = function () {
        this.course.execute();
    };
    return Course;
})();

const CourseA = (function () {
    function CourseA() { }
    CourseA.prototype.execute = function () {
        choose.PackageA();
    };
    return CourseA;
})();

const CourseB = (function () {
    function CourseB() { }
    CourseB.prototype.execute = function () {
        choose.PackageB();
    };
    return CourseB;
})();

const CourseC = (function () {
    function CourseC() { }
    CourseC.prototype.execute = function () {
        choose.PackageC();
    };
    return CourseC;
})();

const SubSystemMovie = function () { };     // Movie
const SubSystemOpera = function () { };     // Opera
const SubSystemSoccer = function () { };    // Soccer
const SubSystemBaseball = function () { };    // Baseball

// 총 계산도 옵저버에서 하자
SubSystemMovie.prototype.MethodMovie = function () {    // Movie   
    const movie = new Movie();
    // 묶기, setCommandMovie, setCommandTime
    customerPoint.subscribe(movie);
    movie.selectMovie();
    movie.selectTime();
    movie.selectType();
    movie.selectMovieSeat();
    const moviePrice = sumPrice(movie.movieTime)(movie.movieType)(movie.movieSeat);
    movie.movieList.price = moviePrice;
    movie.getPoint(moviePrice);
    movie.getTotalPrice(moviePrice);
};
SubSystemOpera.prototype.MethodOpera = function () {   // Opera
    const opera = new Opera();
    customerPoint.subscribe(opera);
    opera.selectOpera();
    opera.selectOperaSeat();
    opera.selectService();
    const operaPrice = sumPrice(opera.operaSeat)(opera.operaService)(0);
    opera.operaList.price = operaPrice;
    opera.getPoint(operaPrice);
    opera.getTotalPrice(operaPrice);
};
SubSystemSoccer.prototype.MethodSoccer = function () {     // Soccer
    const soccer = new Soccer();
    customerPoint.subscribe(soccer);
    soccer.selectSoccerTeam();
    soccer.selectSoccerHomeOrAway();
    soccer.selectSoccerSeat();
    const soccerPrice = sumPrice(soccer.soccerTeam)(soccer.soccerPlace)(soccer.soccerSeat);
    soccer.soccerList.price = soccerPrice;
    soccer.getPoint(soccerPrice);
    soccer.getTotalPrice(soccerPrice);
};

SubSystemBaseball.prototype.MethodBaseball = function () {     // Baseball
    const baseball = new Baseball();
    customerPoint.subscribe(baseball);
    baseball.selectTeam();
    baseball.selectHomeOrAway();
    baseball.selectBaseballSeat();
    const baseballPrice = sumPrice(baseball.baseballTeam)(baseball.baseballPlace)(baseball.baseballSeat);
    baseball.baseballList.price = baseballPrice;
    baseball.getPoint(baseballPrice);
    baseball.getTotalPrice(baseballPrice);
};

// Facade pattern
const Package = function () { }
Package.prototype.movie = new SubSystemMovie();       // Movie
Package.prototype.opera = new SubSystemOpera();       // Opera
Package.prototype.soccer = new SubSystemSoccer();     // Soccer
Package.prototype.baseball = new SubSystemBaseball();     // Baseball

Package.prototype.PackageA = function () {  // selected Course A
    this.movie.MethodMovie();               // Movie
    this.opera.MethodOpera();               // Opera
    this.soccer.MethodSoccer();             // Soccer
};
Package.prototype.PackageB = function () {  // selected Course B
    this.movie.MethodMovie();               // Movie
    this.soccer.MethodSoccer();             // Soccer
    this.baseball.MethodBaseball();         // Baseball
};
Package.prototype.PackageC = function () {  // selected Course C
    this.opera.MethodOpera();               // Opera
    this.soccer.MethodSoccer();             // Soccer
    this.baseball.MethodBaseball();               // Baseball
};


// 코스 고르기
const selectCourse = function () {
    console.log("[Package]");
    console.log(" A  -  [Movie, Opera, Soccer]");
    console.log(" B  -  [Movie, Soccer, Baseball]");
    console.log(" C  -  [Opera, Soccer, Baseball]");

    let select = new Course();
    console.log("Selected A Package!\n");
    select.setCourse(new CourseA());        // A strategy

    // console.log("Selected B Course!\n");
    // select.setCourse(new CourseB());     // B strategy
    
    // console.log("Selected C Course!\n");
    // select.setCourse(new CourseC());     // C strategy

    select.execute();
};

const getTotalPrice = function () {
    console.log("[Receipt]");
    console.log("Total Price: $" + customerPoint.totalPrice);
    console.log("Point: " + customerPoint.totalPoint);
    // 1. 모두 보여주기, 2. 1번 항목 보여주기, 3. 2번 항목 보여주기, 4. 3번 항목 보여주기
};

const choose = new Package();

const main = function () {
    selectCourse();
    getTotalPrice();
};

main();