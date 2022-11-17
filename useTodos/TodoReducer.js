export const todoReducer = (initialState = [], action) => {
    switch (action.type) {
        case 'Todo-Add':
            return [...initialState, action.payload]
        case 'Todo-Remove':
            return initialState.filter( todo => todo.id !==  action.payload)

        case 'Todo-Complete':
            return initialState.map( todo => {
                
                if (todo.id ===  action.payload){
                    return {
                        ...todo, 
                        done: !todo.done
                    }
                }
                    
                
                return todo;
            })
    
            

        case "Todo-Update":
            throw new Error('Action.type = ABC is not implemented')
    
        default:
            return initialState;
    }
}