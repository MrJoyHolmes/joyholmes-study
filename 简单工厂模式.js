let UserFactory = function (role) {
    function User(opt) {
        this.name = opt.name;
        this.viewPage = opt.viewPage;
    }
    switch (role) {
        case "superAdmin":
            return new User({name:"superAdmin",viewPage:[1,2,3]});
            break;
        case "admin":
            return new User({name:"admin",viewPage:[1,2]});
            break;
        case "user":
            return new User({name:"user",viewPage:[1]});
            break;
        default:
            throw new Error("参数错误, 可选参数:superAdmin、admin、user");
    }
};

//调用
let superAdmin = UserFactory("superAdmin");
let admin = UserFactory("admin");
let normalUser = UserFactory("user");
//最后得到角色,可以调用
console.log(superAdmin.viewPage)