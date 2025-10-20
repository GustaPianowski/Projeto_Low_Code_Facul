import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Heart, Code, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  description: string;
  icon: any;
  color: string;
}

interface DoctorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentBooked: (appointment: any) => void;
}

export const DoctorSelectionModal: React.FC<DoctorSelectionModalProps> = ({
  isOpen,
  onClose,
  onAppointmentBooked
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    reason: '',
    notes: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Felipe',
      specialty: 'Especialista em Low Code',
      description: 'Especialista em desenvolvimento de soluções com Low Code e automação de processos',
      icon: Code,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Dr. Bruno',
      specialty: 'Especialista em Coração',
      description: 'Cardiologista especializado em doenças do coração e sistema cardiovascular',
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      id: '3',
      name: 'Dra. Amanda',
      specialty: 'Especialista em Coração',
      description: 'Cardiologista com foco em prevenção e tratamento de doenças cardíacas',
      icon: Stethoscope,
      color: 'bg-pink-500'
    }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleInputChange = (field: string, value: string) => {
    setAppointmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!selectedDoctor) {
      toast({
        title: "Erro",
        description: "Selecione um médico",
        variant: "destructive"
      });
      return false;
    }

    if (!appointmentData.date) {
      toast({
        title: "Erro",
        description: "Selecione uma data",
        variant: "destructive"
      });
      return false;
    }

    if (!appointmentData.time) {
      toast({
        title: "Erro",
        description: "Selecione um horário",
        variant: "destructive"
      });
      return false;
    }

    if (!appointmentData.reason.trim()) {
      toast({
        title: "Erro",
        description: "Descreva o motivo da consulta",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleBookAppointment = async () => {
    if (!validateForm()) return;

    setIsBooking(true);

    try {
      // Simula um delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1500));

      const appointment = {
        id: Math.random().toString(36).substr(2, 9),
        doctor: selectedDoctor!.name,
        specialty: selectedDoctor!.specialty,
        date: appointmentData.date,
        time: appointmentData.time,
        reason: appointmentData.reason,
        notes: appointmentData.notes,
        status: 'pending'
      };

      toast({
        title: "Consulta agendada!",
        description: `Sua consulta com ${selectedDoctor!.name} foi agendada com sucesso.`,
      });

      onAppointmentBooked(appointment);
      handleClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao agendar a consulta. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  const handleClose = () => {
    setSelectedDoctor(null);
    setAppointmentData({
      date: '',
      time: '',
      reason: '',
      notes: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Agendar Nova Consulta
          </DialogTitle>
          <DialogDescription>
            Selecione um médico e preencha os dados da consulta
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Seleção de Médicos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Escolha um Médico</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {doctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedDoctor?.id === doctor.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full ${doctor.color} flex items-center justify-center mb-4`}>
                      <doctor.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription>{doctor.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                      {doctor.description}
                    </p>
                    {selectedDoctor?.id === doctor.id && (
                      <Badge className="w-full mt-2 justify-center">
                        Selecionado
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Formulário de Agendamento */}
          {selectedDoctor && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Médico Selecionado: {selectedDoctor.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data da Consulta *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={appointmentData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Horário *</Label>
                  <Select value={appointmentData.time} onValueChange={(value) => handleInputChange('time', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo da Consulta *</Label>
                <Textarea
                  id="reason"
                  placeholder="Descreva o motivo da sua consulta..."
                  value={appointmentData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações Adicionais</Label>
                <Textarea
                  id="notes"
                  placeholder="Informações adicionais que possam ser relevantes..."
                  value={appointmentData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleBookAppointment}
              disabled={!selectedDoctor || isBooking}
              className="flex-1"
            >
              {isBooking ? 'Agendando...' : 'Confirmar Agendamento'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

