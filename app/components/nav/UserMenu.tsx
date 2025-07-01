'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import MenuItem from './MenuItem'
import BackDrop from './BackDrop'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/types'
import { AiFillCaretDown } from 'react-icons/ai'
import { Avatar } from '@mui/material'

interface UserMenuProps {
    currentUser: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    return (
        <>
            <div className='relative z-30'>
                <div
                    onClick={toggleOpen}
                    className='
                        p-2
                        border-[1px]
                        border-orange-400
                        flex
                        flex-row
                        items-center
                        gap-1
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                        text-orange-500
                    '
                >
                    <Avatar src={currentUser?.image || ''} className='size-8 bg-orange-500' />
                    <AiFillCaretDown size={20} />
                </div>

                {isOpen && (
                    <div
                        className='absolute
                            rounded-md
                            shadow-md
                            w-[170px]
                            bg-white
                            overflow-hidden
                            right-0
                            top-12
                            text-sm
                            flex
                            flex-col
                            cursor-pointer'
                    >
                        {currentUser ? (
                            <div>
                                <Link href="/orders">
                                    <MenuItem onClick={toggleOpen}>Seus pedidos</MenuItem>
                                </Link>

                                {currentUser.role === 'ADMIN' && (
                                    <Link href="/admin">
                                        <MenuItem onClick={toggleOpen}>Admin</MenuItem>
                                    </Link>
                                )}
                                <hr />
                                <MenuItem
                                    onClick={() => {
                                        toggleOpen()
                                        signOut()
                                    }}
                                >
                                    Sair
                                </MenuItem>
                            </div>
                        ) : (
                            <div>
                                <Link href="/login">
                                    <MenuItem onClick={toggleOpen}>Entrar</MenuItem>
                                </Link>
                                <Link href="/register">
                                    <MenuItem onClick={toggleOpen}>Cadastrar</MenuItem>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
        </>
    )
}

export default UserMenu
