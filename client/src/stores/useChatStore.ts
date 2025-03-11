import {create} from 'zustand'

interface ChatStore{
    users: any[],
    fetchUsers: () => Promise<void>


}