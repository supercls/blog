var sqlMap = {
    user: {
        add: 'insert into user (name, pass, sex,createTime) values (?,?,?,?)',
        select_name: 'select * from user', 
        update_user: 'update user set'
    },
    article:{
    	add:'insert into article (title,author,content,type,readers,likes,createTime) values (?,?,?,?,?,?,?)',
    	get:'select * from article order by createTime desc limit ?, ?',
    	addLikes:'update article set',
    	reader:'update article set',
    	review:'insert into review (user,content,articleId,createTime) values(?,?,?,?)'
    }
}

module.exports = sqlMap;