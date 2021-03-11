const getLocation = require('../../util/GetLocation');

exports.getMyLocate = async(ctx) => {
    try {
        const { lon, lat } = ctx.request.body;

        const myLocation = await getLocation.getRealLocation({
            lon,
            lat
        });

        const address = translateAddress(myLocation);

        ctx.body = address;

    }   catch(e) {
        return ctx.throw(500, e);
    }
}

const translateAddress = (location) => {
    const { region } = location.results[0];

    let Name = '';
    for(var key in region) {
        if(region[key].name != 'kr') 
            Name += region[key].name + ' ';
        
    };

    return Name;
}