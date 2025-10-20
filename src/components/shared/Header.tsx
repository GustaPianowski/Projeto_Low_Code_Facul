import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LogOut, Settings, Bell } from 'lucide-react';

interface HeaderProps {
  user: any;
  userType: 'patient' | 'attendant' | 'manager';
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, userType, onLogout }) => {
  const getTypeLabel = () => {
    const labels = {
      patient: 'Paciente',
      attendant: 'Atendente', 
      manager: 'Gerente'
    };
    return labels[userType];
  };

  const getTypeColor = () => {
    const colors = {
      patient: 'bg-success text-success-foreground',
      attendant: 'bg-primary text-primary-foreground',
      manager: 'bg-accent text-accent-foreground'
    };
    return colors[userType];
  };

  return (
    <div className="border-b bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {userType === 'patient' && 'Portal do Paciente'}
            {userType === 'attendant' && 'Painel do Atendente'}
            {userType === 'manager' && 'Painel Gerencial'}
          </h1>
          <p className="text-muted-foreground">Bem-vindo, {user.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={getTypeColor()}>
            {getTypeLabel()}
          </Badge>
          <ThemeToggle />
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          {onLogout && (
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          )}
          <Avatar>
            <AvatarFallback>
              {user.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};