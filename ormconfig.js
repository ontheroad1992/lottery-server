module.exports = {
    // 数据库类型
    type: 'mysql',
    // 链接地址
    host: 'localhost',
    // 端口
    port: 3306,
    // 用户名
    username: 'base',
    // 密码
    password: '123456',
    // 数据库名
    database: 'base',
    // 要加载并用于此连接的实体
    entities: ['dist/**/*.entity{.ts,.js}'],
    // 表名统一前缀
    entityPrefix: 'test_',
    // 自动创建数据库，注意会自动清除之前创建好的数据
    synchronize: true,
    // 开启日志
    logging: false,
    // 主从复制
    // replication: {
    //     master: {
    //         host: 'localhost',
    //         port: 3306,
    //         username: 'gohash',
    //         password: 'GhBtw6bb5G4jZkmP',
    //         database: 'gohash'
    //     },
    //     slaves: [{
    //         host: "cd-cdb-mj2jw04u.sql.tencentcdb.com",
    //         port: 62731,
    //         username: "root",
    //         password: "hepengba0",
    //         database: "gohash",
    //         synchronize: true,
    //     }],
    //     /**
    //     * 如果为true，则PoolCluster将在连接失败时尝试重新连接。 （默认值：true）
    //     */
    //     canRetry: true,

    //     /**
    //      * 如果连接失败，则节点的errorCount会增加。
    //      * 当errorCount大于removeNodeErrorCount时，删除PoolCluster中的节点。 （默认值：5）
    //      */
    //     removeNodeErrorCount: 5,

    //     /**
    //      * 如果连接失败，则指定在进行另一次连接尝试之前的毫秒数。
    //      * 如果设置为0，则将删除节点，并且永远不会重复使用。 （默认值：0）
    //      */
    //     restoreNodeTimeout: 0,

    //     /**
    //      * 确定如何选择从库：
    //      * RR：交替选择一个（Round-Robin）。
    //      * RANDOM: 通过随机函数选择节点。
    //      * ORDER: 无条件选择第一个
    //      */
    //     selector: "ORDER"
    // }
};
