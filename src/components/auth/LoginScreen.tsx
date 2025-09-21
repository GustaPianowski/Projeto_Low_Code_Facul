import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageSquare, BarChart3 } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (userType: 'patient' | 'attendant' | 'manager', userData: any) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (userType: 'patient' | 'attendant' | 'manager') => {
    // Mock authentication
    const userData = {
      name: userType === 'patient' ? 'João Silva' : userType === 'attendant' ? 'Ana Santos' : 'Dr. Carlos Lima',
      email: email || `${userType}@clinica.com`,
      id: Math.random().toString(36).substr(2, 9)
    };
    onLogin(userType, userData);
  };

  const UserTypeCard = ({ 
    type, 
    title, 
    description, 
    icon: Icon,
    color 
  }: {
    type: 'patient' | 'attendant' | 'manager';
    title: string;
    description: string;
    icon: any;
    color: string;
  }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="text-center">
        <div className={`w-16 h-16 mx-auto rounded-full ${color} flex items-center justify-center mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => handleLogin(type)}
          className="w-full"
          variant="outline"
        >
          Acessar como {title}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">ClinicaConnect</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Sistema Omnichannel para Atendimento Médico
          </p>
        </div>

        <Tabs defaultValue="quick-access" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="quick-access">Acesso Rápido</TabsTrigger>
            <TabsTrigger value="login">Login Tradicional</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick-access">
            <div className="grid md:grid-cols-3 gap-6">
              <UserTypeCard
                type="patient"
                title="Paciente"
                description="Agende consultas e acompanhe seu histórico médico"
                icon={Heart}
                color="bg-success"
              />
              <UserTypeCard
                type="attendant"
                title="Atendente"
                description="Gerencie mensagens e atendimentos de pacientes"
                icon={MessageSquare}
                color="bg-primary"
              />
              <UserTypeCard
                type="manager"
                title="Gerente"
                description="Supervisione equipe e monitore indicadores"
                icon={BarChart3}
                color="bg-accent"
              />
            </div>
          </TabsContent>

          <TabsContent value="login">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Fazer Login</CardTitle>
                <CardDescription>
                  Digite suas credenciais para acessar o sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => handleLogin('attendant')}
                  className="w-full"
                >
                  Entrar
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};