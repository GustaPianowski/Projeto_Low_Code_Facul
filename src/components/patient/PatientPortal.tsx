import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  MessageSquare, 
  FileText, 
  Heart,
  Clock,
  CheckCircle,
  Send,
  Phone,
  Mail
} from 'lucide-react';

export const PatientPortal: React.FC<{ user: any }> = ({ user }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('whatsapp');

  const mockAppointments = [
    {
      id: '1',
      doctor: 'Dr. Carlos Lima',
      specialty: 'Cardiologia',
      date: '2024-01-15',
      time: '14:30',
      status: 'confirmed'
    },
    {
      id: '2',
      doctor: 'Dra. Ana Santos',
      specialty: 'Dermatologia', 
      date: '2024-01-22',
      time: '10:00',
      status: 'pending'
    }
  ];

  const mockMessages = [
    {
      id: '1',
      channel: 'whatsapp',
      message: 'Sua consulta foi agendada para 15/01 às 14:30',
      timestamp: '10:30',
      isFromClinic: true
    },
    {
      id: '2',
      channel: 'whatsapp',
      message: 'Obrigado! Vou comparecer no horário.',
      timestamp: '10:35',
      isFromClinic: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage, 'via', selectedChannel);
      setNewMessage('');
    }
  };

  const getChannelIcon = (channel: string) => {
    const icons = {
      whatsapp: '💬',
      email: '✉️',
      phone: '📞'
    };
    return icons[channel as keyof typeof icons] || '💬';
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Portal do Paciente</h1>
            <p className="text-muted-foreground">Bem-vindo, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-primary text-primary-foreground">
              <Heart className="w-3 h-3 mr-1" />
              Plano Ativo
            </Badge>
            <Avatar>
              <AvatarFallback>{user.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Consultas</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
            <TabsTrigger value="exams">Exames</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Próximas Consultas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <h4 className="font-medium">{appointment.doctor}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span>📅 {appointment.date}</span>
                            <span>🕐 {appointment.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                            {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Reagendar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Agendar Nova Consulta</CardTitle>
                  <CardDescription>
                    Solicite uma nova consulta através do nosso sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Consulta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Conversas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.isFromClinic ? '' : 'justify-end'}`}
                    >
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.isFromClinic 
                          ? 'bg-muted' 
                          : 'bg-primary text-primary-foreground'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <span className="text-xs opacity-70">{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nova Mensagem</CardTitle>
                  <CardDescription>
                    Escolha o canal e envie sua mensagem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    {['whatsapp', 'email', 'phone'].map((channel) => (
                      <Button
                        key={channel}
                        variant={selectedChannel === channel ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChannel(channel)}
                      >
                        {getChannelIcon(channel)} {channel}
                      </Button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={4}
                  />
                  <Button onClick={handleSendMessage} className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Meus Exames
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhum exame disponível no momento</p>
                  <Button variant="outline" className="mt-4">
                    Solicitar Exame
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-sm text-muted-foreground">(11) 3456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">contato@clinica.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horário de Atendimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Segunda - Sexta</span>
                      <span className="text-muted-foreground">8h - 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado</span>
                      <span className="text-muted-foreground">8h - 12h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo</span>
                      <span className="text-muted-foreground">Fechado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};