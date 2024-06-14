"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ImSpinner10 } from 'react-icons/im';

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Digite um email válido.").min(1, "O email é obrigatório."),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value);
    }, {
        message: "O número de telefone deve estar neste formato (DD) 999999999"
    }),
    address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({ userId }: { userId: string }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleRegisterCustomer(data: FormData) {
        setLoading(true);
        try {
            await api.post("/api/customer", {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                userId
            });
            
            router.replace("/dashboard/customer");
            
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            router.refresh();
        }
    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="mb-1 text-lg font-medium">Nome completo</label>
            <Input 
                type="text"
                name='name'
                placeholder="Digite o nome completo"
                error={errors.name?.message}
                register={register}
            />  
            <section className="flex gap-2 my-2 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Telefone</label>
                    <Input 
                        type="text"
                        name='phone'
                        placeholder="Exemplo (DD) 999999999"
                        error={errors.phone?.message}
                        register={register}
                    />   
                </div>
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Email</label>
                    <Input 
                        type="email"
                        name='email'
                        placeholder="Digite o email"
                        error={errors.email?.message}
                        register={register}
                    />  
                </div>
            </section>  
            <label className="mb-1 text-lg font-medium">Endereço completo</label>
            <Input 
                type="text"
                name='address'
                placeholder="Digite o endereço do cliente"
                error={errors.address?.message}
                register={register}
            />  
            <button
                type="submit"
                className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold flex items-center justify-center"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <ImSpinner10 className="animate-spin mr-2" size={24} />
                    </>
                ) : (
                    "Cadastrar"
                )}
            </button>
        </form>
    );
}
