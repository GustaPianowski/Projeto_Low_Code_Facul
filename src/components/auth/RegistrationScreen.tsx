import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Calendar, User, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RegistrationScreenProps {
  onRegistrationComplete: (userData: any) => void;
  onBackToLogin: () => void;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ 
  onRegistrationComplete, 
  onBackToLogin 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    cpf: '',
    appointmentType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCPF = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara do CPF
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.birthDate) {
      toast({
        title: "Erro",
        description: "Data de nascimento é obrigatória",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.cpf || formData.cpf.replace(/\D/g, '').length !== 11) {
      toast({
        title: "Erro",
        description: "CPF deve ter 11 dígitos",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.appointmentType) {
      toast({
        title: "Erro",
        description: "Tipo de atendimento é obrigatório",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simula um delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        birthDate: formData.birthDate,
        cpf: formData.cpf,
        appointmentType: formData.appointmentType,
        email: `${formData.name.toLowerCase().replace(/\s+/g, '.')}@clinica.com`,
        registrationDate: new Date().toISOString()
      };

      toast({
        title: "Cadastro realizado!",
        description: "Seus dados foram registrados com sucesso.",
      });

      onRegistrationComplete(userData);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar o cadastro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">ClinicaConnect</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Cadastro de Paciente
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Dados Pessoais
            </CardTitle>
            <CardDescription>
              Preencha seus dados para criar sua conta no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                  maxLength={14}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointmentType">Tipo de Atendimento *</Label>
                <Select 
                  value={formData.appointmentType} 
                  onValueChange={(value) => handleInputChange('appointmentType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de atendimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geral">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Atendimento Geral
                      </div>
                    </SelectItem>
                    <SelectItem value="clinico">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Clínico
                      </div>
                    </SelectItem>
                    <SelectItem value="ortopedista">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Ortopedista
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBackToLogin}
                  className="flex-1"
                >
                  Voltar ao Login
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Ao se cadastrar, você concorda com nossos termos de uso e política de privacidade.
          </p>
        </div>
      </div>
    </div>
  );
};

