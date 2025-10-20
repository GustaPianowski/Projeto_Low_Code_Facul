import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  Eye,
  UserCheck,
  ArrowLeft
} from 'lucide-react';

interface AttendantStats {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy';
  messagesHandled: number;
  avgResponseTime: number;
  satisfactionScore: number;
  activeChats: number;
}

interface ManagerDashboardProps {
  user: any;
  onLogout?: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ user, onLogout }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const mockAttendants: AttendantStats[] = [
    {
      id: '1',
      name: 'Ana Santos',
      status: 'online',
      messagesHandled: 24,
      avgResponseTime: 3.2,
      satisfactionScore: 4.8,
      activeChats: 3
    },
    {
      id: '2',
      name: 'Carlos Oliveira',
      status: 'busy',
      messagesHandled: 18,
      avgResponseTime: 5.1,
      satisfactionScore: 4.5,
      activeChats: 5
    },
    {
      id: '3',
      name: 'Mariana Costa',
      status: 'online',
      messagesHandled: 31,
      avgResponseTime: 2.8,
      satisfactionScore: 4.9,
      activeChats: 2
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      online: 'bg-success',
      offline: 'bg-gray-500',
      busy: 'bg-warning'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const getStatusText = (status: string) => {
    const texts = {
      online: 'Online',
      offline: 'Offline', 
      busy: 'Ocupado'
    };
    return texts[status as keyof typeof texts] || 'Offline';
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onLogout && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-foreground">Painel Gerencial</h1>
              <p className="text-muted-foreground">Bem-vindo, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Tempo Real
            </Button>
            <Avatar>
              <AvatarFallback>{user.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Mensagens Hoje</p>
                  <p className="text-2xl font-bold">73</p>
                  <p className="text-xs text-success">+12% vs ontem</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Tempo Médio</p>
                  <p className="text-2xl font-bold">3.7m</p>
                  <p className="text-xs text-success">-8% vs ontem</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Taxa Resolução</p>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-xs text-success">+2% vs ontem</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Satisfação</p>
                  <p className="text-2xl font-bold">4.7</p>
                  <p className="text-xs text-success">+0.2 vs ontem</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Atendentes</p>
                  <p className="text-2xl font-bold">3/4</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="attendants" className="space-y-4">
          <TabsList>
            <TabsTrigger value="attendants">Equipe</TabsTrigger>
            <TabsTrigger value="queue">Fila de Atendimento</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          </TabsList>

          <TabsContent value="attendants">
            <Card>
              <CardHeader>
                <CardTitle>Performance da Equipe</CardTitle>
                <CardDescription>
                  Acompanhe o desempenho de cada atendente em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAttendants.map((attendant) => (
                    <div key={attendant.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback>{attendant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(attendant.status)}`} />
                        </div>
                        <div>
                          <h4 className="font-medium">{attendant.name}</h4>
                          <p className="text-sm text-muted-foreground">{getStatusText(attendant.status)}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-8 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Mensagens</p>
                          <p className="font-bold text-lg">{attendant.messagesHandled}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tempo Médio</p>
                          <p className="font-bold text-lg">{attendant.avgResponseTime}m</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Satisfação</p>
                          <p className="font-bold text-lg">{attendant.satisfactionScore}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Chats Ativos</p>
                          <p className="font-bold text-lg">{attendant.activeChats}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <UserCheck className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queue">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fila de Atendimento</CardTitle>
                  <CardDescription>6 mensagens aguardando</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Maria Silva - WhatsApp', 'João Santos - Email', 'Ana Costa - Facebook'].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm">{item}</span>
                        <Badge variant="outline" className="bg-warning text-warning-foreground">
                          {index + 2}m
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Canais</CardTitle>
                  <CardDescription>Mensagens por canal hoje</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { channel: 'WhatsApp', count: 32, color: 'bg-green-500' },
                      { channel: 'Email', count: 18, color: 'bg-blue-500' },
                      { channel: 'Facebook', count: 15, color: 'bg-blue-600' },
                      { channel: 'Instagram', count: 8, color: 'bg-pink-500' }
                    ].map((item) => (
                      <div key={item.channel} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.channel}</span>
                          <span>{item.count} mensagens</span>
                        </div>
                        <Progress value={(item.count / 73) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatório de Produtividade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Gráficos de produtividade serão exibidos aqui</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Alertas e Notificações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      <div>
                        <p className="text-sm font-medium">Fila crescendo</p>
                        <p className="text-xs text-muted-foreground">6 mensagens aguardando há mais de 5min</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring">
            <Card>
              <CardHeader>
                <CardTitle>Monitoramento em Tempo Real</CardTitle>
                <CardDescription>
                  Acompanhe conversas ativas e intervenha quando necessário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Activity className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Interface de monitoramento em tempo real</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};