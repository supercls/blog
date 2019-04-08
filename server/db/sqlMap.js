var sqlMap = {
    user: {
        add: 'insert into user (name, pass, sex,createTime) values (?,?,?,?)',
        select_name: 'select * from article', 
        update_user: 'update article set'
    }
}

module.exports = sqlMap;