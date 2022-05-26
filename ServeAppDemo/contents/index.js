const listMenu = [
    {
        order_id: 1,
        name: 'Meal A',
        price: 1500,
        image: require('../assets/images/com.jpg'),
        note: 'Hot, much rice, fresh, fast',
        ordertime: '2022-05-11 12:30',
        table_id: 1,
        table_nm: 'No.1',
        is_done: false
    },
    {
        order_id: 2,
        name: 'Meal A',
        price: 1500,
        image: require('../assets/images/com.jpg'),
        note: 'Hot, much rice, fresh, fast',
        ordertime: '2022-05-11 12:30',
        table_id: 3,
        table_nm: 'No.3',
        is_done: false
    },
    {
        order_id: 3,
        name: 'Meal A',
        price: 1500,
        image: require('../assets/images/com.jpg'),
        note: 'Hot, much rice, fresh, fast',
        ordertime: '2022-05-11 12:30',
        table_id: 5,
        table_nm: 'No.5',
        is_done: false
    },
    {
        order_id: 4,
        name: 'Meal B',
        price: 2500,
        image: require('../assets/images/pho.jpg'),
        note: 'Hot, much rice, fresh, fast',
        ordertime: '2022-05-11 12:30',
        table_id: 1,
        table_nm: 'No.1',
        is_done: false
    },
    {
        order_id: 5,
        name: 'Meal B',
        price: 2500,
        image: require('../assets/images/pho.jpg'),
        note: 'Hot, much rice, fresh, fast',
        ordertime: '2022-05-11 12:30',
        table_id: 2,
        table_nm: 'No.2',
        is_done: true
    },
    {
        order_id: 6,
        name: 'Meal B',
        price: 2500,
        image: require('../assets/images/pho.jpg'),
        note: 'Hot, much rice, fresh, fast',
        ordertime: '2022-05-11 12:30',
        table_id: 5,
        table_nm: 'No.5',
        is_done: true
    },
]

const listTable = [
    {
        table_id: 1,
        table_nm: "No.1",
        table_stt: "empty",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
    {
        table_id: 2,
        table_nm: "No.2",
        table_stt: "book",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
    {
        table_id: 3,
        table_nm: "No.3",
        table_stt: "order",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: true
    },
    {
        table_id: 4,
        table_nm: "No.4",
        table_stt: "empty",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
    {
        table_id: 5,
        table_nm: "No.5",
        table_stt: "order",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
    {
        table_id: 6,
        table_nm: "No.6",
        table_stt: "empty",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
    {
        table_id: 7,
        table_nm: "No.7",
        table_stt: "serve",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: true
    },
    {
        table_id: 8,
        table_nm: "No.8",
        table_stt: "serve",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
    {
        table_id: 9,
        table_nm: "No.9",
        table_stt: "empty",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
    {
        table_id: 10,
        table_nm: "No.10",
        table_stt: "serve",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
    {
        table_id: 11,
        table_nm: "No.11",
        table_stt: "order",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
    {
        table_id: 12,
        table_nm: "No.12",
        table_stt: "serve",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
    {
        table_id: 13,
        table_nm: "No.13",
        table_stt: "book",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
    {
        table_id: 14,
        table_nm: "No.14",
        table_stt: "empty",
        table_icon: require('../assets/images/table1.png'),
        table_note: 'This is test note',
        table_calling: false
    },
]

const listCategory = [
    {
        cate_id: 1,
        cate_nm: 'Menu 1',
    },
    {
        cate_id: 2,
        cate_nm: 'Menu 2',
    },
    {
        cate_id: 3,
        cate_nm: 'Menu 3',
    },
    {
        cate_id: 4,
        cate_nm: 'Menu 4',
    },
    {
        cate_id: 5,
        cate_nm: 'Menu 5',
    },
    {
        cate_id: 6,
        cate_nm: 'Menu 6',
    },
    {
        cate_id: 7,
        cate_nm: 'Menu 7',
    },
    {
        cate_id: 8,
        cate_nm: 'Menu 8',
    },

]


const getListByMenuId = (id) => {
    switch (id) {
        case 1:
            return listMeal_Menu_1
        case 2:
            return listMeal_Menu_2
        case 3:
            return listMeal_Menu_3
        case 4:
            return listMeal_Menu_4
        default:
            return listMeal_Menu_4
    }
}


const listMeal_Menu_1 = [
    {
        meal_id: 1,
        meal_nm: 'Cơm sườn',
        price: 1500,
        image: require('../assets/images/com.jpg'),
    },
    {
        meal_id: 2,
        meal_nm: 'Bún bò',
        price: 3500,
        image: require('../assets/images/bun.jpg'),
    },
    {
        meal_id: 3,
        meal_nm: 'Phở bò',
        price: 5500,
        image: require('../assets/images/pho.jpg'),
    },
    {
        meal_id: 4,
        meal_nm: 'Phở bò',
        price: 5500,
        image: require('../assets/images/pho.jpg'),
    },
    {
        meal_id: 5,
        meal_nm: 'Phở bò',
        price: 5500,
        image: require('../assets/images/pho.jpg'),
    },
    {
        meal_id: 6,
        meal_nm: 'Phở bò',
        price: 5500,
        image: require('../assets/images/pho.jpg'),
    },
]

const listMeal_Menu_2 = [
    {
        meal_id: 4,
        meal_nm: 'Coffe',
        price: 4500,
        image: require('../assets/images/cafe.jpg'),
    },
]

const listMeal_Menu_3 = [
    {
        meal_id: 5,
        meal_nm: 'Bánh ngọt',
        price: 2500,
        image: require('../assets/images/banh.jpg'),
    },
]

const listMeal_Menu_4 = []


const getListTableOrder = (stt) => {
    switch (stt) {
        case "Booking":
            return []
        case "Emptying":
            return []
        case "Serving":
            return listTableServe
        case "Ordering":
            return listTableOrder
    }
}

const listTableOrder = {
    table_id: 1,
    table_nm: 'No.1',
    order_list: [
        {
            meal_id: 1,
            meal_nm: 'Cơm sườn',
            count: 2,
            price: 1500,
            status: 'done',
        },
        {
            meal_id: 2,
            meal_nm: 'Bún bò',
            count: 1,
            price: 2500,
            status: 'wait',
        },
    ],
    note_tx:'request note order',
}

const listTableServe = {
    table_id: 2,
    table_nm: 'No.2',
    order_list: [
        {
            meal_id: 1,
            meal_nm: 'Cơm sườn',
            count: 2,
            price: 1500,
            status: 'done',
        },
        {
            meal_id: 2,
            meal_nm: 'Bún bò',
            count: 1,
            price: 2500,
            status: 'done',
        },
    ],
    note_tx:'request note serve',
}

const listReceipt = [
    {
        
    }
]





export {
    listMenu,
    listTable,
    listCategory,
    getListByMenuId,
    getListTableOrder
}