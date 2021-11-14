class ApiFeatures {
    constructor (query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search () {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};
        
        this.query = this.query.find(keyword);
        return this;
    }

    filter () {
        const category = this.queryStr.category ? {
            category: this.queryStr.category
        } : {};

        this.query = this.query.find(category);
        return this;
    }

    pagination (resPerPage) {
        const currPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currPage - 1);
        
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;