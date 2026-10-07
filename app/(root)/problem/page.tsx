import { getCurrentUserData } from '@/modules/auth/actions';
import React from 'react'

const ProblemsPage = async ()=> {
    const response = await getCurrentUserData();
    const user = response.userData;
  return (
    <div>
      ProblemsPage
    </div>
  )
}

export default ProblemsPage;
