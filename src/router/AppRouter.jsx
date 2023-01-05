import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useCheckAuth } from '../hooks';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui';

export const AppRouter = () => {

	const { status } = useCheckAuth();
	if (status === 'checking') {
		return <CheckingAuth />
	}
	return (
		<Routes>
			{
				(status === 'authenticated')
					?
					<Route path="/*" element={<JournalRoutes />} />
					:
					<Route path="/auth/*" element={<AuthRoutes />} />
			}
			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	)
}
/**
|--------------------------------------------------
| linea 31 : si el status es igual a 'autenticado' vamos al componente principal
| linea 34 : si no es distinto a autenticado vamos a la componente de las rutas de autenticacion
|--------------------------------------------------
*/


{/* JournalApp  */ }