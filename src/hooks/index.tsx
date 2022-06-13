import React from 'react'
import {ToastProvider} from './ToastContext'
import {AuthProvider} from './AuthContext';
import {PostsProvider} from './DataContext';
import {SidebarProvider} from './SidebarActive';
import {ModalProvider} from './ModalContext';
import {PaginationProvider} from './Pagination';
import { QueryClientProvider} from 'react-query'
import {queryClient} from '../services/queryClient'


const AppProvider: React.FC = ({children}) =>(

  <AuthProvider>
    <QueryClientProvider client ={queryClient}>
      <ModalProvider>
        <SidebarProvider>
          <ToastProvider>
            <PaginationProvider>
              <PostsProvider>
                {children}
              </PostsProvider>
            </PaginationProvider>
          </ToastProvider>
        </SidebarProvider>
      </ModalProvider>
    </QueryClientProvider>
  </AuthProvider>
)

export default AppProvider