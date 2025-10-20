import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Send, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  ArrowLeft
} from 'lucide-react';

interface Message {
  id: string;
  patient: string;
  channel: 'whatsapp' | 'email' | 'facebook' | 'instagram' | 'phone';
  message: string;
  timestamp: string;
  status: 'new' | 'in-progress' | 'resolved';
  priority: 'low' | 'normal' | 'high';
}

interface AttendantDashboardProps {
  user: any;
  onLogout?: () => void;
}

export const AttendantDashboard: React.FC<AttendantDashboardProps> = ({ user, onLogout }) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const mockMessages: Message[] = [
    {
      id: '1',
      patient: 'Maria Silva',
      channel: 'whatsapp',
      message: 'Boa tarde! Gostaria de agendar uma consulta com o cardiologista para a próxima semana.',
      timestamp: '14:30',
      status: 'new',
      priority: 'normal'
    },
    {
      id: '2', 
      patient: 'João Santos',
      channel: 'email',
      message: 'Preciso reagendar minha consulta de amanhã, tive um imprevisto no trabalho.',
      timestamp: '13:45',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: '3',
      patient: 'Ana Costa',
      channel: 'facebook',
      message: 'Olá, meu exame ficou pronto? Quando posso buscar?',
      timestamp: '12:20',
      status: 'new',
      priority: 'normal'
    }
  ];

  const getChannelIcon = (channel: string) => {
    const icons = {
      whatsapp: '💬',
      email: '✉️',
      facebook: '📘',
      instagram: '📸',
      phone: '📞'
    };
    return icons[channel as keyof typeof icons] || '💬';
  };

  const getChannelColor = (channel: string) => {
    const colors = {
      whatsapp: 'bg-green-500',
      email: 'bg-blue-500',
      facebook: 'bg-blue-600',
      instagram: 'bg-pink-500',
      phone: 'bg-gray-500'
    };
    return colors[channel as keyof typeof colors] || 'bg-gray-500';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-warning',
      'in-progress': 'bg-primary',
      resolved: 'bg-success'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'border-green-500',
      normal: 'border-blue-500', 
      high: 'border-red-500'
    };
    return colors[priority as keyof typeof colors] || 'border-gray-500';
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log('Sending reply:', replyText);
      setReplyText('');
    }
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
              <h1 className="text-2xl font-bold text-foreground">Painel do Atendente</h1>
              <p className="text-muted-foreground">Bem-vindo, estou estudando, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-success text-success-foreground">
              Online
            </Badge>
            <Avatar>
              <AvatarFallback>{user.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 p-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Mensagens Hoje</p>
                <p className="text-2xl font-bold">24</p>
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
                <p className="text-2xl font-bold">5m</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Resolvidos</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 px-6 pb-6">
        {/* Messages List */}
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Caixa de Entrada</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar mensagens..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-l-4 ${getPriorityColor(message.priority)} ${
                    selectedMessage?.id === message.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-full ${getChannelColor(message.channel)} flex items-center justify-center text-white text-sm`}>
                        {getChannelIcon(message.channel)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{message.patient}</span>
                          <Badge variant="outline" className={`text-xs ${getStatusColor(message.status)} text-white`}>
                            {message.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>
              {selectedMessage ? `Conversa com ${selectedMessage.patient}` : 'Selecione uma mensagem'}
            </CardTitle>
            {selectedMessage && (
              <CardDescription>
                Canal: {selectedMessage.channel} • Status: {selectedMessage.status}
              </CardDescription>
            )}
          </CardHeader>
          {selectedMessage ? (
            <>
              <CardContent className="flex-1 space-y-4">
                {/* Patient Message */}
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">{selectedMessage.patient[0]}</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg max-w-xs">
                    <p className="text-sm">{selectedMessage.message}</p>
                    <span className="text-xs text-muted-foreground">{selectedMessage.timestamp}</span>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <div className="p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua resposta..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendReply} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Selecione uma mensagem para iniciar o atendimento</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};