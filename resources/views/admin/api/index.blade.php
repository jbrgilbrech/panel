@extends('layouts.admin')

@section('title')
    Application API
@endsection

@section('content-header')
    <h1>Application API<small>Control access credentials for managing this Panel via the API.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Application API</li>
    </ol>
@endsection

@section('content')
    @php
        $rows = [];
        foreach ($keys as $key) {
            $rows[] = [
                'created' => $key->created_at->diffForHumans(),
                'createdBy' => [
                    'url' => route('admin.users.view', $key->user->id),
                    'username' => $key->user->username,
                ],
                'display' => Auth::user()->is($key->user) ? $key->identifier . decrypt($key->token) : $key->identifier . '****',
                'identifier' => $key->identifier,
                'lastUsed' => $key->last_used_at ? $key->last_used_at->diffForHumans() : null,
                'memo' => $key->memo,
                'revokeUrl' => route('admin.api.delete', $key->identifier),
            ];
        }

        $pageData = [
            'createUrl' => route('admin.api.new'),
            'keys' => $rows,
        ];
    @endphp
    <div
        id="admin-page-root"
        data-page="api-index"
        data-props='@json($pageData)'
    ></div>
@endsection
